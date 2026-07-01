const { prisma } = require('../lib/prisma');
const AppError = require('../utils/errorHandler');

const URGENCY_PRIORITY_MAP = {
  Normal: "Normal",
  Medium: "High",
  High: "High",
  Critical: "Urgent",
};

const DB_STATUS_TO_UI_STATUS = {
  Pending: "Pending",
  "In Progress": "In Transit",
  Completed: "Completed",
};

function mapPriorityToUrgency(priority, fillLevel = 0) {
  if (priority === "Urgent") return "Critical";
  if (priority === "High") return fillLevel >= 85 ? "High" : "Medium";
  return fillLevel >= 95 ? "Critical" : fillLevel >= 85 ? "High" : fillLevel >= 70 ? "Medium" : "Normal";
}

function formatJob(job, index = 0) {
  const device = job.device;
  const fillLevel = device?.fillLevel ?? 0;
  const urgency = mapPriorityToUrgency(job.priority, fillLevel);
  const uiStatus = DB_STATUS_TO_UI_STATUS[job.status] || "Pending";
  const completedTime =
    job.status === "Completed"
      ? new Date(job.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : undefined;

  return {
    id: job.id,
    device: `UNIT SN: ${device?.customBinId ?? "UNKNOWN"}`,
    type: (device?.lastSortedItem || "MIXED").toUpperCase(),
    location: device?.location ?? "Unknown location",
    zone: device?.location ?? "Unassigned zone",
    fill: fillLevel,
    urgency,
    responseTime:
      uiStatus === "Completed"
        ? "Completed"
        : urgency === "Critical"
          ? "18m Overdue"
          : urgency === "High"
            ? "04m Remaining"
            : urgency === "Medium"
              ? "Awaiting Pick-up"
              : "Awaiting Route",
    status: uiStatus,
    assignedTo: job.collectorId ?? null,
    distance: uiStatus === "In Transit" ? "En route - 0.8 miles away" : undefined,
    completedTime,
    sortOrder: index,
  };
}

function mapJobStatus(value) {
  if (value === "In Transit" || value === "In Progress") return "In Progress";
  if (value === "Completed") return "Completed";
  return "Pending";
}

async function upsertDeviceFromJobInput({ device, location, fill, type }) {
  const normalizedFill = Number(fill) || 0;
  return prisma.device.upsert({
    where: { customBinId: device },
    update: {
      location,
      fillLevel: normalizedFill,
      lastSortedItem: type,
      status: normalizedFill >= 95 ? "Full" : "Active",
    },
    create: {
      customBinId: device,
      location,
      fillLevel: normalizedFill,
      lastSortedItem: type,
      status: normalizedFill >= 95 ? "Full" : "Active",
    },
  });
}

class JobService {
  async getJobs(facilityId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const where = facilityId ? { device: { facilityId } } : {};

    const [jobs, totalCount] = await Promise.all([
      prisma.collectionJob.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { device: true },
        skip,
        take: limit,
      }),
      prisma.collectionJob.count({ where }),
    ]);

    return {
      jobs: jobs.map((job, index) => formatJob(job, index)),
      totalCount,
    };
  }

  async createJob(body) {
    const { device, location, fill, urgency, type, collectorId } = body;
    if (!device || !location) {
      throw new AppError('Device and location are required', 400, 'VALIDATION_FAILED');
    }

    const deviceRecord = await upsertDeviceFromJobInput({ device, location, fill, type });

    const createdJob = await prisma.collectionJob.create({
      data: {
        status: 'Pending',
        priority: URGENCY_PRIORITY_MAP[urgency] || 'Normal',
        deviceId: deviceRecord.id,
        collectorId: collectorId ?? null,
      },
      include: { device: true },
    });

    return createdJob ? formatJob(createdJob) : null;
  }

  async updateJob(id, body) {
    const { status, collectorId } = body;
    const jobExists = await prisma.collectionJob.findUnique({ where: { id } });
    if (!jobExists) {
      throw new AppError('Collection job not found', 404, 'NOT_FOUND');
    }

    const updatedJob = await prisma.collectionJob.update({
      where: { id },
      data: {
        status: mapJobStatus(status),
        ...(collectorId !== undefined ? { collectorId } : {}),
      },
      include: { device: true },
    });

    return formatJob(updatedJob);
  }

  async getJobsSummary(facilityId) {
    const deviceWhere = facilityId ? { device: { facilityId } } : {};

    const [pendingCount, inProgressCount, completedCount, activeCollectorsCount, totalCollectors] = await Promise.all([
      prisma.collectionJob.count({ where: { ...deviceWhere, status: 'Pending' } }),
      prisma.collectionJob.count({ where: { ...deviceWhere, status: 'In Progress' } }),
      prisma.collectionJob.count({ where: { ...deviceWhere, status: 'Completed' } }),
      prisma.user.count({ where: { role: 'COLLECTOR', status: 'ACTIVE' } }),
      prisma.user.count({ where: { role: 'COLLECTOR' } }),
    ]);

    const avgResponseMinutes = completedCount > 0 ? Math.max(12, Math.round(180 / completedCount)) : 18;
    const avgResponseSeconds = Math.round((180 % (completedCount || 1)) * 60 / (completedCount || 1)) % 60;
    const responseTimeStr = `${avgResponseMinutes}m ${String(avgResponseSeconds).padStart(2, '0')}s`;

    const tonnageCollected = completedCount * 0.25;
    const targetTonnage = 10;
    const tonnageGoalPercent = Math.min(100, Math.round((tonnageCollected / targetTonnage) * 100));

    return {
      pendingJobs: pendingCount,
      avgResponseTime: responseTimeStr,
      activeCollectors: `${String(activeCollectorsCount).padStart(2, '0')}`,
      totalCollectors: `${String(totalCollectors).padStart(2, '0')}`,
      tonnageGoal: `${tonnageGoalPercent}%`
    };
  }

  async getBulkJobs() {
    return prisma.bulkCollectionJob.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        facility: {
          select: { name: true }
        }
      }
    });
  }

  async createBulkJob(body) {
    const { facilityId, tonnage, collectorName, collectorId, scheduledFor } = body;
    if (!facilityId || !tonnage) {
      throw new AppError('facilityId and tonnage are required', 400, 'VALIDATION_FAILED');
    }

    return prisma.bulkCollectionJob.create({
      data: {
        facilityId,
        tonnage: Number(tonnage),
        collectorName: collectorName || 'Awaiting Assignment',
        collectorId: collectorId || null,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        status: 'Pending'
      },
      include: {
        facility: {
          select: { name: true }
        }
      }
    });
  }

  async updateBulkJob(id, body) {
    const { status, collectorId, collectorName } = body;
    const jobExists = await prisma.bulkCollectionJob.findUnique({ where: { id } });
    if (!jobExists) {
      throw new AppError('Bulk collection job not found', 404, 'NOT_FOUND');
    }

    const updateData = {};
    if (status !== undefined) {
      updateData.status = status;
      if (status === 'Completed') {
        updateData.completedAt = new Date();
      }
    }
    if (collectorId !== undefined) updateData.collectorId = collectorId;
    if (collectorName !== undefined) updateData.collectorName = collectorName;

    return prisma.bulkCollectionJob.update({
      where: { id },
      data: updateData,
      include: {
        facility: {
          select: { name: true }
        }
      }
    });
  }
}

module.exports = new JobService();
