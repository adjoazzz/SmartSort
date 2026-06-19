const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client'); // Import Prisma
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;
const isSupabaseDatabase = /supabase\.com/i.test(databaseUrl || '');

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: isSupabaseDatabase ? { rejectUnauthorized: false } : undefined,
});

// Initialize Prisma Client
const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

// Initialize the Express app
const app = express();


// Middleware
app.use(cors()); // Allows your React app to make requests here
app.use(express.json()); // Allows the server to understand JSON data from the Raspberry Pi

const requireManager = (req, res, next) => {
  next();
};

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
  if (value === "In Transit") return "In Progress";
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

function formatUser(collector) {
  return {
    id: collector.collectorId,
    name: collector.name,
    region: collector.region,
    status: collector.status,
    rating: collector.rating,
    email: collector.email ?? null,
    joinedAt: collector.joinedAt,
  };
}

function formatUser(user) {
  return {
    id: user.userId,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    avatar: user.avatar ?? null,
    assignedFacility: user.assignedFacility,
  };
}

async function buildNextSequentialId(model, fieldName, prefix) {
  const totalCount = await model.count();
  let nextIndex = totalCount + 1;
  let candidate = `${prefix}${String(nextIndex).padStart(3, '0')}`;

  while (await model.findUnique({ where: { [fieldName]: candidate } })) {
    nextIndex += 1;
    candidate = `${prefix}${String(nextIndex).padStart(3, '0')}`;
  }

  return candidate;
}

// A basic test route to ensure the server is working
app.get('/api/status', (req, res) => {
  res.json({ message: "SmartSort Backend is running perfectly!" });
});

// The route where your Raspberry Pi will eventually send bin data
app.post('/api/bins/telemetry', async (req, res) => {
  try {
    // 1. Extract the data the Pi sent in the request body
    const { customBinId, location, fillLevel, lastSortedItem } = req.body;

    // 2. Save it to the PostgreSQL database using Prisma
    const updatedBin = await prisma.device.upsert({
      where: { customBinId: customBinId }, // Look for the bin by its ID
      update: {
        fillLevel: fillLevel,
        lastSortedItem: lastSortedItem,
        status: fillLevel >= 95 ? "Full" : "Active" // Automatically change status if full
      },
      create: {
        customBinId: customBinId,
        location: location,
        fillLevel: fillLevel,
        lastSortedItem: lastSortedItem,
        status: fillLevel >= 95 ? "Full" : "Active"
      }
    });

    console.log(`Successfully updated bin: ${customBinId} | Fill Level: ${fillLevel}%`);

    // 3. Send a success message back to the Pi
    res.status(200).json({ status: "success", data: updatedBin });

  } catch (error) {
    console.error("Error saving bin data:", error);
    res.status(500).json({ error: "Failed to save data to the database" });
  }
});


// PATCH a device (Manager Only)
app.patch('/api/devices/:id', requireManager, async (req, res) => {
  try {
    const { id } = req.params;
    const { location, status, fillLevel, lastSortedItem } = req.body;
    
    const updatedDevice = await prisma.device.update({
      where: { customBinId: id },
      data: {
        ...(location !== undefined ? { location } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(fillLevel !== undefined ? { fillLevel } : {}),
        ...(lastSortedItem !== undefined ? { lastSortedItem } : {})
      }
    });
    
    res.status(200).json(updatedDevice);
  } catch (error) {
    console.error("Error updating device:", error);
    res.status(500).json({ error: "Failed to update device" });
  }
});

// GET route for the React Frontend to fetch all bin statuses
app.get('/api/devices', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [devices, totalCount] = await Promise.all([
      prisma.device.findMany({
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.device.count(),
    ]);

    res.status(200).json({
      data: devices,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ error: "Failed to fetch devices" });
  }
});

// GET device event log combining DeviceEvent and ProcessedItem
app.get('/api/devices/:id/events', async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    
    // In a real scenario we might paginate properly across the union,
    // but for simplicity we fetch latest from both and combine/sort in memory.
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

    const combinedEvents = [...formattedSystemEvents, ...formattedSortingEvents]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);

    res.status(200).json(combinedEvents);
  } catch (error) {
    console.error("Error fetching device events:", error);
    res.status(500).json({ error: "Failed to fetch device events" });
  }
});

// GET collectors for the collectors admin page
app.get('/api/collectors', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [collectors, totalCount] = await Promise.all([
      prisma.user.findMany({
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({ where: { role: 'COLLECTOR' } }),
    ]);

    res.status(200).json({
      data: collectors.map(formatUser),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching collectors:', error);
    res.status(500).json({ error: 'Failed to fetch collectors' });
  }
});


app.post('/api/auth/sync', async (req, res) => {
  try {
    const { id, email, name, role } = req.body;
    if (!id || !email) return res.status(400).json({ error: 'id and email required' });
    
    const user = await prisma.user.upsert({
      where: { email },
      update: { authId: id, name: name || 'Unknown', role: role || 'MANAGER' },
      create: { id, authId: id, email, name: name || 'Unknown', role: role || 'MANAGER' }
    });
    res.status(200).json(user);
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to sync auth user' });
  }
});

// GET users for the user management page
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    res.status(200).json(users.map(formatUser));
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create a collector invite record
app.post('/api/collectors', async (req, res) => {
  try {
    const { name, email, region, status, rating } = req.body;

    if (!name || !region) {
      return res.status(400).json({ error: 'Name and region are required' });
    }

    const collectorId = await buildNextSequentialId(prisma.user, 'id', 'COL-');

    const createdCollector = await prisma.user.create({
      data: {
        collectorId,
        name,
        email: email || null,
        region,
        status: status || 'Pending',
        rating: Number(rating) || 0,
      },
    });

    res.status(201).json(formatUser(createdCollector));
  } catch (error) {
    console.error('Error creating collector:', error);
    res.status(500).json({ error: 'Failed to create collector' });
  }
});

// Update a collector record
app.patch('/api/collectors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, region, status, rating } = req.body;

    const updatedCollector = await prisma.user.update({
      where: { collectorId: id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email: email || null } : {}),
        ...(region !== undefined ? { region } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(rating !== undefined ? { rating: Number(rating) || 0 } : {}),
      },
    });

    res.status(200).json(formatUser(updatedCollector));
  } catch (error) {
    console.error('Error updating collector:', error);
    res.status(500).json({ error: 'Failed to update collector' });
  }
});

// Create a platform user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, role, status, assignedFacility, avatar } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Name, email, and role are required' });
    }

    const userId = await buildNextSequentialId(prisma.user, 'id', 'USR-');

    const createdUser = await prisma.user.create({
      data: {
        userId,
        name,
        email,
        role,
        status: status || 'PENDING',
        assignedFacility: assignedFacility || 'Unassigned',
        avatar: avatar || null,
      },
    });

    res.status(201).json(formatUser(createdUser));
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Create platform users in bulk
app.post('/api/users/bulk', async (req, res) => {
  try {
    const { users } = req.body;

    if (!users || !Array.isArray(users)) {
      return res.status(400).json({ error: 'An array of users is required' });
    }

    const createdUsers = [];
    for (const u of users) {
      const { name, email, role, status, assignedFacility } = u;

      if (!name || !email || !role) {
        continue;
      }

      const userId = await buildNextSequentialId(prisma.platformUser, 'userId', 'USR-');

      const createdUser = await prisma.platformUser.create({
        data: {
          userId,
          name,
          email,
          role,
          status: status || 'PENDING',
          assignedFacility: assignedFacility || 'Unassigned',
          avatar: null,
        },
      });

      createdUsers.push(formatPlatformUser(createdUser));
    }

    res.status(201).json(createdUsers);
  } catch (error) {
    console.error('Error in bulk import:', error);
    res.status(500).json({ error: 'Failed to bulk import users' });
  }
});

// Update a platform user record
app.patch('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status, assignedFacility, avatar } = req.body;

    const updatedUser = await prisma.user.update({
      where: { userId: id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(role !== undefined ? { role } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(assignedFacility !== undefined ? { assignedFacility } : {}),
        ...(avatar !== undefined ? { avatar: avatar || null } : {}),
      },
    });

    res.status(200).json(formatUser(updatedUser));
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// GET collection jobs derived from the database
app.get('/api/jobs', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [jobs, totalCount] = await Promise.all([
      prisma.collectionJob.findMany({
        orderBy: { createdAt: 'desc' },
        include: { device: true },
        skip,
        take: limit,
      }),
      prisma.collectionJob.count(),
    ]);

    res.status(200).json({
      data: jobs.map((job, index) => formatJob(job, index)),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching collection jobs:', error);
    res.status(500).json({ error: 'Failed to fetch collection jobs' });
  }
});

// Create a new collection job and keep the related device in sync
app.post('/api/jobs', async (req, res) => {
  try {
    const { device, location, fill, urgency, type, collectorId } = req.body;

    if (!device || !location) {
      return res.status(400).json({ error: 'Device and location are required' });
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

    res.status(201).json(formatJob(createdJob));
  } catch (error) {
    console.error('Error creating collection job:', error);
    res.status(500).json({ error: 'Failed to create collection job' });
  }
});

// Update a collection job's status or assigned collector
app.patch('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, collectorId } = req.body;

    const updatedJob = await prisma.collectionJob.update({
      where: { id },
      data: {
        status: mapJobStatus(status),
        ...(collectorId !== undefined ? { collectorId } : {}),
      },
      include: { device: true },
    });

    res.status(200).json(formatJob(updatedJob));
  } catch (error) {
    console.error('Error updating collection job:', error);
    res.status(500).json({ error: 'Failed to update collection job' });
  }
});

// GET dashboard summary for pages that need DB-driven KPI snapshots
app.get('/api/dashboard/summary', async (req, res) => {
  try {
    const [devices, jobs, feedback] = await Promise.all([
      prisma.device.findMany({ select: { status: true, fillLevel: true } }),
      prisma.collectionJob.findMany({ select: { status: true } }),
      prisma.feedback.findMany({ select: { status: true } }),
    ]);

    const activeDevices = devices.filter((device) => device.status === 'Active' || device.status === 'Online' || !device.status).length;
    const totalDevices = devices.length;
    const pendingJobs = jobs.filter((job) => job.status === 'Pending').length;
    const inTransitJobs = jobs.filter((job) => job.status === 'In Progress').length;
    const completedJobs = jobs.filter((job) => job.status === 'Completed').length;
    const pendingFeedback = feedback.filter((item) => item.status === 'Pending').length;
    const inProgressFeedback = feedback.filter((item) => item.status === 'In Progress').length;
    const resolvedFeedback = feedback.filter((item) => item.status === 'Resolved').length;

    const averageFill = totalDevices
      ? Math.round(devices.reduce((sum, device) => sum + (device.fillLevel ?? 0), 0) / totalDevices)
      : 0;

    res.status(200).json({
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
    });
  } catch (error) {
    console.error('Error building dashboard summary:', error);
    res.status(500).json({ error: 'Failed to build dashboard summary' });
  }
});

// GET dynamic overview metrics for Dashboard KPIs
app.get('/api/dashboard/metrics', async (req, res) => {
  try {
    const [devicesCount, activeDevicesCount, totalSorted, totalRejected] = await Promise.all([
      prisma.device.count(),
      prisma.device.count({
        where: {
          status: { in: ['Active', 'Online'] },
        },
      }),
      prisma.processedItem.count({
        where: { status: 'Sorted' },
      }),
      prisma.processedItem.count({
        where: { status: 'Rejected' },
      }),
    ]);

    const totalProcessed = totalSorted + totalRejected;
    const recyclingRate = totalProcessed > 0 ? ((totalSorted / totalProcessed) * 100).toFixed(1) + '%' : '84.2%';
    const contaminationRate = totalProcessed > 0 ? ((totalRejected / totalProcessed) * 100).toFixed(1) + '%' : '4.1%';

    res.status(200).json({
      deviceStatus: `${activeDevicesCount}/${devicesCount}`,
      totalItemsSorted: totalSorted.toLocaleString(),
      recyclingRate,
      contaminationRate,
    });
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
});

// GET hourly throughput counts grouped by hour
app.get('/api/dashboard/throughput', async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const items = await prisma.processedItem.findMany({
      where: {
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

    const data = Object.keys(throughputMap)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => throughputMap[key]);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching throughput data:', error);
    res.status(500).json({ error: 'Failed to fetch throughput data' });
  }
});

// GET sorted items share by category
app.get('/api/dashboard/waste-categories', async (req, res) => {
  try {
    const itemsGrouped = await prisma.processedItem.groupBy({
      by: ['category'],
      where: { status: 'Sorted' },
      _count: {
        id: true,
      },
    });

    const totalSorted = itemsGrouped.reduce((sum, group) => sum + group._count.id, 0);

    const categoryCounts = {
      Plastic: 0,
      Paper: 0,
      Metal: 0,
      Other: 0,
    };

    itemsGrouped.forEach((group) => {
      if (group.category === 'Plastic') categoryCounts.Plastic = group._count.id;
      else if (group.category === 'Paper') categoryCounts.Paper = group._count.id;
      else if (group.category === 'Metal') categoryCounts.Metal = group._count.id;
      else {
        categoryCounts.Other += group._count.id;
      }
    });

    const data = Object.keys(categoryCounts).map((cat) => {
      const count = categoryCounts[cat];
      const percentage = totalSorted > 0 ? Math.round((count / totalSorted) * 100) : 25;
      return {
        category: cat,
        percentage,
      };
    });

    res.status(200).json({
      total: totalSorted,
      categories: data,
    });
  } catch (error) {
    console.error('Error fetching waste categories:', error);
    res.status(500).json({ error: 'Failed to fetch waste categories' });
  }
});

// GET live contamination/rejection events joined with Device
app.get('/api/dashboard/contamination-events', async (req, res) => {
  try {
    const recentRejections = await prisma.processedItem.findMany({
      where: { status: 'Rejected' },
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: {
        device: true,
      },
    });

    const data = recentRejections.map((item) => {
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

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching contamination events:', error);
    res.status(500).json({ error: 'Failed to fetch contamination events' });
  }
});

// GET Alerts with pagination
app.get('/api/alerts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [alerts, totalCount] = await Promise.all([
      prisma.alert.findMany({
        orderBy: { createdAt: 'desc' },
        include: { device: true },
        skip,
        take: limit,
      }),
      prisma.alert.count(),
    ]);

    const formattedAlerts = alerts.map((alert) => {
      const diffMs = new Date() - new Date(alert.createdAt);
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const timeSub = diffHours > 0 ? `${diffHours} hours ago` : `${diffMins} mins ago`;

      return {
        id: alert.id,
        deviceIcon: alert.device?.deviceType || "bin",
        deviceName: alert.device?.customBinId || "Unknown Device",
        deviceLocation: alert.device?.location || "Unknown Location",
        severity: alert.severity,
        messageTitle: alert.title,
        messageDesc: alert.description,
        timestampMain: new Date(alert.createdAt).toLocaleString(),
        timestampSub: timeSub,
        actions: [
          { label: "Mark as Read", type: "secondary" },
          { label: "Dispatch Tech", type: "primary" },
        ],
      };
    });

    res.status(200).json({
      data: formattedAlerts,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// GET Alerts Summary
app.get('/api/alerts/summary', async (req, res) => {
  try {
    const alerts = await prisma.alert.findMany();
    const critical = alerts.filter(a => a.severity === 'CRITICAL').length;
    const warning = alerts.filter(a => a.severity === 'WARNING').length;
    res.status(200).json({ critical, warning });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alerts summary' });
  }
});

// GET Analytics Historical
app.get('/api/analytics/historical', async (req, res) => {
  try {
    // Generate simple aggregation for the last 5 weeks
    const data = [];
    const baseDate = new Date();
    
    for (let w = 4; w >= 0; w--) {
      const start = new Date(baseDate);
      start.setDate(start.getDate() - (w * 7) - 7);
      const end = new Date(baseDate);
      end.setDate(end.getDate() - (w * 7));
      
      const items = await prisma.processedItem.findMany({
        where: { createdAt: { gte: start, lte: end } }
      });
      
      const total = items.length;
      const sorted = items.filter(i => i.status === 'Sorted').length;
      const rejected = items.filter(i => i.status === 'Rejected').length;
      
      const name = end.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
      const recycling = total > 0 ? Math.round((sorted / total) * 100) : 0;
      const contamination = total > 0 ? Math.round((rejected / total) * 100) : 0;
      
      data.push({ name, recycling, contamination });
    }
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics historical' });
  }
});

// GET Analytics Tonnage
app.get('/api/analytics/tonnage', async (req, res) => {
  // Mock computed tonnage derived from items
  res.status(200).json([
    { name: "Corrugated Cardboard", value: "420t (34%)", percent: 34, color: "bg-[#10b981]" },
    { name: "Mixed Plastics (PET/HDPE)", value: "312t (25%)", percent: 25, color: "bg-[#10b981]" },
    { name: "Aluminum & Metals", value: "224t (18%)", percent: 18, color: "bg-[#10b981]" },
    { name: "Glass (Clear/Amber)", value: "187t (15%)", percent: 15, color: "bg-[#10b981]" },
    { name: "Residual Waste", value: "105t (8%)", percent: 8, color: "bg-[#cbd5e1]" },
  ]);
});

// GET Analytics Categories
app.get('/api/analytics/categories', async (req, res) => {
  res.status(200).json([
    { icon: "boxes", name: "Recycled Paper & Pulp", volume: "582.4", growth: "+8.2%", growthTrend: "up", goal: 92, goalColor: "bg-[#10b981]" },
    { icon: "magnet", name: "Ferrous Metals", volume: "144.9", growth: "-2.1%", growthTrend: "down", goal: 78, goalColor: "bg-[#10b981]" },
    { icon: "drop", name: "Liquid Contaminants", volume: "22.8", growth: "+0.4%", growthTrend: "neutral", goal: 12, goalColor: "bg-[#ba1a1a]" },
  ]);
});

// GET all community feedback reports
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbackList = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(feedbackList);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// POST a new community feedback report
app.post('/api/feedback', async (req, res) => {
  try {
    const { userName, location, category, message } = req.body;

    if (!userName || !location || !category || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newFeedback = await prisma.feedback.create({
      data: {
        userName,
        location,
        category,
        message,
        status: "Pending"
      }
    });

    res.status(201).json(newFeedback);
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// PATCH a feedback's status
app.patch('/api/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: { status }
    });

    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error("Error updating feedback status:", error);
    res.status(500).json({ error: "Failed to update feedback status" });
  }
});

// Define the port (uses the one in .env, or defaults to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});