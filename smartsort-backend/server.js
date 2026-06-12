const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client'); // Import Prisma
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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

function formatCollector(collector) {
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

function formatPlatformUser(user) {
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

// GET route for the React Frontend to fetch all bin statuses
app.get('/api/devices', async (req, res) => {
  try {
    // Fetch all devices from the database, ordered by newest first
    const allDevices = await prisma.device.findMany({
      orderBy: { updatedAt: 'desc' }
    });

    res.status(200).json(allDevices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ error: "Failed to fetch devices" });
  }
});

// GET collectors for the collectors admin page
app.get('/api/collectors', async (req, res) => {
  try {
    const collectors = await prisma.collector.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    res.status(200).json(collectors.map(formatCollector));
  } catch (error) {
    console.error('Error fetching collectors:', error);
    res.status(500).json({ error: 'Failed to fetch collectors' });
  }
});

// GET users for the user management page
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.platformUser.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    res.status(200).json(users.map(formatPlatformUser));
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

    const collectorId = await buildNextSequentialId(prisma.collector, 'collectorId', 'COL-');

    const createdCollector = await prisma.collector.create({
      data: {
        collectorId,
        name,
        email: email || null,
        region,
        status: status || 'Pending',
        rating: Number(rating) || 0,
      },
    });

    res.status(201).json(formatCollector(createdCollector));
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

    const updatedCollector = await prisma.collector.update({
      where: { collectorId: id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email: email || null } : {}),
        ...(region !== undefined ? { region } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(rating !== undefined ? { rating: Number(rating) || 0 } : {}),
      },
    });

    res.status(200).json(formatCollector(updatedCollector));
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

    const userId = await buildNextSequentialId(prisma.platformUser, 'userId', 'USR-');

    const createdUser = await prisma.platformUser.create({
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

    res.status(201).json(formatPlatformUser(createdUser));
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update a platform user record
app.patch('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status, assignedFacility, avatar } = req.body;

    const updatedUser = await prisma.platformUser.update({
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

    res.status(200).json(formatPlatformUser(updatedUser));
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// GET collection jobs derived from the database
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await prisma.collectionJob.findMany({
      orderBy: { createdAt: 'desc' },
      include: { device: true },
    });

    res.status(200).json(jobs.map((job, index) => formatJob(job, index)));
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