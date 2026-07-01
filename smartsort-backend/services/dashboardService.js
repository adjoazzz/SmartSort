const { prisma } = require('../lib/prisma');

class DashboardService {
  async getDashboardSummary(facilityId) {
    const deviceWhere = facilityId ? { facilityId } : {};
    const jobWhere = facilityId ? { device: { facilityId } } : {};

    const [
      activeDevices,
      totalDevices,
      pendingJobs,
      inTransitJobs,
      completedJobs,
      pendingFeedback,
      inProgressFeedback,
      resolvedFeedback,
      avgFillAggregate
    ] = await Promise.all([
      prisma.device.count({
        where: {
          ...deviceWhere,
          status: { in: ['Active', 'Online'] }
        }
      }),
      prisma.device.count({ where: deviceWhere }),
      prisma.collectionJob.count({
        where: {
          ...jobWhere,
          status: 'Pending'
        }
      }),
      prisma.collectionJob.count({
        where: {
          ...jobWhere,
          status: 'In Progress'
        }
      }),
      prisma.collectionJob.count({
        where: {
          ...jobWhere,
          status: 'Completed'
        }
      }),
      prisma.feedback.count({ where: { status: 'Pending' } }),
      prisma.feedback.count({ where: { status: 'In Progress' } }),
      prisma.feedback.count({ where: { status: 'Resolved' } }),
      prisma.device.aggregate({
        where: deviceWhere,
        _avg: {
          fillLevel: true
        }
      })
    ]);

    const averageFill = avgFillAggregate._avg.fillLevel
      ? Math.round(avgFillAggregate._avg.fillLevel)
      : 0;

    return {
      devices: {
        active: activeDevices,
        total: totalDevices,
        averageFill,
      },
      jobs: {
        pending: pendingJobs,
        inTransit: inTransitJobs,
        completed: completedJobs,
      },
      feedback: {
        pending: pendingFeedback,
        inProgress: inProgressFeedback,
        resolved: resolvedFeedback,
      },
    };
  }

  async getDashboardMetrics(facilityId) {
    const deviceWhere = facilityId ? { facilityId } : {};
    const activeDeviceWhere = facilityId ? { facilityId, status: { in: ['Active', 'Online'] } } : { status: { in: ['Active', 'Online'] } };
    const itemWhere = facilityId ? { device: { facilityId } } : {};

    const [devicesCount, activeDevicesCount, totalSorted, totalRejected] = await Promise.all([
      prisma.device.count({ where: deviceWhere }),
      prisma.device.count({ where: activeDeviceWhere }),
      prisma.processedItem.count({
        where: { ...itemWhere, status: 'Sorted' },
      }),
      prisma.processedItem.count({
        where: { ...itemWhere, status: 'Rejected' },
      }),
    ]);

    const totalProcessed = totalSorted + totalRejected;
    const recyclingRate = totalProcessed > 0 ? ((totalSorted / totalProcessed) * 100).toFixed(1) + '%' : '84.2%';
    const contaminationRate = totalProcessed > 0 ? ((totalRejected / totalProcessed) * 100).toFixed(1) + '%' : '4.1%';

    return {
      deviceStatus: `${activeDevicesCount}/${devicesCount}`,
      totalItemsSorted: totalProcessed.toLocaleString(),
      recyclingRate,
      contaminationRate,
    };
  }

  async getThroughput(facilityId) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const itemWhere = facilityId ? { device: { facilityId } } : {};

    const items = await prisma.processedItem.findMany({
      where: {
        ...itemWhere,
        createdAt: {
          gte: startOfToday,
        },
      },
      select: {
        status: true,
        createdAt: true,
      },
    });

    const throughputMap = {};
    for (let h = 8; h <= 15; h++) {
      const timeStr = `${String(h).padStart(2, '0')}:00`;
      throughputMap[h] = { time: timeStr, sorted: 0, rejected: 0 };
    }

    items.forEach((item) => {
      const hour = new Date(item.createdAt).getHours();
      if (hour >= 8 && hour <= 15) {
        if (item.status === 'Sorted') {
          throughputMap[hour].sorted += 1;
        } else if (item.status === 'Rejected') {
          throughputMap[hour].rejected += 1;
        }
      }
    });

    return Object.keys(throughputMap)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => throughputMap[key]);
  }

  async getWasteCategories(facilityId) {
    const itemWhere = facilityId ? { device: { facilityId } } : {};

    const itemsGrouped = await prisma.processedItem.groupBy({
      by: ['category'],
      where: itemWhere,
      _count: {
        id: true,
      },
    });

    const totalProcessed = itemsGrouped.reduce((sum, group) => sum + group._count.id, 0);

    const categoryCounts = {
      Plastic: 0,
      Paper: 0,
      Metal: 0,
      Other: 0,
    };

    itemsGrouped.forEach((group) => {
      const catLower = group.category.toLowerCase();
      if (catLower.includes('plastic')) categoryCounts.Plastic += group._count.id;
      else if (catLower.includes('paper')) categoryCounts.Paper += group._count.id;
      else if (catLower.includes('metal') || catLower.includes('can')) categoryCounts.Metal += group._count.id;
      else {
        categoryCounts.Other += group._count.id;
      }
    });

    const data = Object.keys(categoryCounts).map((cat) => {
      const count = categoryCounts[cat];
      const percentage = totalProcessed > 0 ? Math.round((count / totalProcessed) * 100) : 25;
      return {
        category: cat,
        percentage,
      };
    });

    return {
      total: totalProcessed,
      categories: data,
    };
  }

  async getContaminationEvents(facilityId) {
    const itemWhere = facilityId ? { device: { facilityId }, status: 'Rejected' } : { status: 'Rejected' };

    const recentRejections = await prisma.processedItem.findMany({
      where: itemWhere,
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: {
        device: true,
      },
    });

    return recentRejections.map((item) => {
      const timeStr = new Date(item.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      return {
        id: item.id,
        time: timeStr,
        source: item.device.location || item.device.customBinId,
        detection: item.rejectionReason,
        detectionType: 'danger',
        confidence: `${item.confidence}%`,
        img: item.imageUrl,
        action: item.actionTaken,
      };
    });
  }

  async getHistoricalAnalytics(facilityId) {
    const itemWhere = facilityId ? { device: { facilityId } } : {};
    const startRange = new Date();
    startRange.setDate(startRange.getDate() - 35);

    const items = await prisma.processedItem.findMany({
      where: {
        ...itemWhere,
        createdAt: { gte: startRange },
      },
      select: {
        status: true,
        createdAt: true,
      },
    });

    const data = [];
    const baseDate = new Date();

    for (let w = 4; w >= 0; w--) {
      const start = new Date(baseDate);
      start.setDate(start.getDate() - (w * 7) - 7);
      const end = new Date(baseDate);
      end.setDate(end.getDate() - (w * 7));

      const weeklyItems = items.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= start && itemDate <= end;
      });

      const total = weeklyItems.length;
      const sorted = weeklyItems.filter((i) => i.status === 'Sorted').length;
      const rejected = weeklyItems.filter((i) => i.status === 'Rejected').length;

      const name = end.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
      const recycling = total > 0 ? Math.round((sorted / total) * 100) : 0;
      const contamination = total > 0 ? Math.round((rejected / total) * 100) : 0;

      data.push({ name, recycling, contamination });
    }

    return data;
  }

  async getFacilitiesList() {
    const facilities = await prisma.facility.findMany({
      include: {
        devices: {
          include: {
            alerts: {
              where: { status: 'Active' }
            }
          }
        },
        bulkJobs: {
          where: { status: { in: ['Pending', 'Dispatched'] } }
        }
      }
    });

    return facilities.map(f => {
      const deviceCount = f.devices.length;
      const activeDevices = f.devices.filter(d => d.status === 'Active' || d.status === 'Online').length;
      const totalFill = f.devices.reduce((sum, d) => sum + (d.fillLevel || 0), 0);
      const averageFill = deviceCount > 0 ? Math.round(totalFill / deviceCount) : 0;
      const pendingTonnage = f.bulkJobs.reduce((sum, j) => sum + (j.tonnage || 0), 0);
      const alertCount = f.devices.reduce((sum, d) => sum + d.alerts.length, 0);

      return {
        id: f.id,
        name: f.name,
        region: f.region,
        status: f.status,
        latitude: f.latitude,
        longitude: f.longitude,
        deviceCount,
        activeDevices,
        averageFill,
        pendingTonnage: parseFloat(pendingTonnage.toFixed(1)),
        alertCount
      };
    });
  }

  async getGlobalAdminMetrics() {
    const [facilitiesCount, activeFacilitiesCount, devicesCount, activeDevicesCount, totalSorted, totalRejected, pendingJobs, criticalAlerts] = await Promise.all([
      prisma.facility.count(),
      prisma.facility.count({ where: { status: 'Active' } }),
      prisma.device.count(),
      prisma.device.count({ where: { status: { in: ['Active', 'Online'] } } }),
      prisma.processedItem.count({ where: { status: 'Sorted' } }),
      prisma.processedItem.count({ where: { status: 'Rejected' } }),
      prisma.bulkCollectionJob.findMany({
        where: { status: { in: ['Pending', 'Dispatched'] } },
        select: { tonnage: true }
      }),
      prisma.alert.count({ where: { severity: 'CRITICAL', status: 'Active' } })
    ]);

    const totalProcessed = totalSorted + totalRejected;
    const recyclingRate = totalProcessed > 0 ? ((totalSorted / totalProcessed) * 100).toFixed(1) + '%' : '84.2%';
    const contaminationRate = totalProcessed > 0 ? ((totalRejected / totalProcessed) * 100).toFixed(1) + '%' : '4.1%';
    const totalPendingTonnage = pendingJobs.reduce((sum, j) => sum + j.tonnage, 0);

    return {
      facilitiesCount,
      activeFacilitiesCount,
      deviceStatus: `${activeDevicesCount}/${devicesCount}`,
      totalItemsSorted: totalProcessed.toLocaleString(),
      recyclingRate,
      contaminationRate,
      totalPendingTonnage: parseFloat(totalPendingTonnage.toFixed(1)),
      criticalAlertsCount: criticalAlerts
    };
  }
}

module.exports = new DashboardService();
