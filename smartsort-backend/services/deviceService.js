const { prisma } = require('../lib/prisma');
const { supabase } = require('../middleware/auth');
const AppError = require('../utils/errorHandler');

class DeviceService {
  async getDevices(facilityId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const where = facilityId ? { facilityId } : {};

    const [devices, totalCount] = await Promise.all([
      prisma.device.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.device.count({ where }),
    ]);

    return { devices, totalCount };
  }

  async updateDevice(id, data) {
    const device = await prisma.device.findUnique({
      where: { customBinId: id },
    });
    if (!device) {
      throw new AppError('Device not found', 404, 'NOT_FOUND');
    }
    return prisma.device.update({
      where: { customBinId: id },
      data,
    });
  }

  async getDeviceEvents(id, limit = 100) {
    const [systemEvents, sortingEvents] = await Promise.all([
      prisma.deviceEvent.findMany({
        where: { device: { customBinId: id } },
        orderBy: { createdAt: 'desc' },
        take: limit
      }),
      prisma.processedItem.findMany({
        where: { device: { customBinId: id } },
        orderBy: { createdAt: 'desc' },
        take: limit
      })
    ]);

    const formattedSystemEvents = systemEvents.map(e => ({
      id: e.id,
      type: e.eventType,
      time: new Date(e.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      desc: e.description,
      color: e.severity === 'CRITICAL' ? 'text-[#ba1a1a]' : e.severity === 'WARNING' ? 'text-[#f59e0b]' : 'text-[#3b82f6]',
      isSortingEvent: false,
      timestamp: new Date(e.createdAt).getTime()
    }));

    const formattedSortingEvents = sortingEvents.map(e => ({
      id: e.id,
      type: 'SORTING EVENT',
      time: new Date(e.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      desc: `Detected: ${e.category}. Action: ${e.actionTaken}.`,
      color: 'text-[#10b981]',
      isSortingEvent: true,
      timestamp: new Date(e.createdAt).getTime()
    }));

    return [...formattedSystemEvents, ...formattedSortingEvents]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  async saveTelemetry(body) {
    const { customBinId, location, fillLevel, lastSortedItem, confidence, status: itemStatus, imageBase64 } = body;
    
    if (!customBinId) {
      throw new AppError('customBinId is required', 400, 'VALIDATION_FAILED');
    }

    const updatedBin = await prisma.device.upsert({
      where: { customBinId },
      update: {
        fillLevel,
        lastSortedItem,
        status: fillLevel >= 95 ? "Full" : "Active"
      },
      create: {
        customBinId,
        location: location || "Unknown Location",
        fillLevel: fillLevel || 0,
        lastSortedItem,
        status: fillLevel >= 95 ? "Full" : "Active"
      }
    });

    let imageUrl = null;
    
    if (imageBase64) {
      try {
        const buffer = Buffer.from(imageBase64, 'base64');
        const fileName = `${customBinId}_${Date.now()}.jpg`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('bin_captures')
          .upload(fileName, buffer, {
            contentType: 'image/jpeg',
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) {
          console.error("Supabase upload error:", uploadError);
        } else {
          const { data: publicUrlData } = supabase.storage.from('bin_captures').getPublicUrl(fileName);
          imageUrl = publicUrlData.publicUrl;
        }
      } catch (err) {
        console.error("Error processing image upload:", err);
      }
    }

    if (lastSortedItem) {
      const isRejected = lastSortedItem.toLowerCase().includes("reject") || itemStatus === "Rejected";
      await prisma.processedItem.create({
        data: {
          deviceId: updatedBin.id,
          category: lastSortedItem,
          status: isRejected ? "Rejected" : "Sorted",
          rejectionReason: isRejected ? "Unrecognized item" : null,
          confidence: confidence || 95.0,
          actionTaken: isRejected ? "Sent to manual review" : "Sorted into correct bin",
          imageUrl: imageUrl
        }
      });
      
      await prisma.deviceEvent.create({
        data: {
          deviceId: updatedBin.id,
          eventType: "ITEM_SORTED",
          description: `Sorted item: ${lastSortedItem} (${(confidence || 95.0).toFixed(1)}% confidence)`,
          severity: "INFO"
        }
      });
    }

    return updatedBin;
  }
}

module.exports = new DeviceService();
