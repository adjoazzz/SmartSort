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
app.use(express.json({ limit: '50mb' })); // Allows the server to understand JSON data from the Raspberry Pi
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const crypto = require('crypto');

const decodeJWT = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
  } catch (e) {
    return null;
  }
};

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If no token is provided, check if client requested mock role
    // Mock default role is ADMIN if header is not passed.
    const mockRole = req.headers['x-mock-role'] || 'ADMIN';
    req.user = {
      id: 'mock-admin-id',
      role: mockRole.toUpperCase(),
      email: `${mockRole.toLowerCase()}@smartsort.com`,
      name: `${mockRole.charAt(0).toUpperCase() + mockRole.slice(1)} User`,
      facilityId: null,
    };
    return next();
  }

  const payload = decodeJWT(token);
  if (!payload || !payload.email) {
    return res.status(401).json({ error: 'Invalid or expired authentication token' });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      // Sync auth user automatically if not present in DB
      const role = payload.email.toLowerCase().includes('admin') ? 'ADMIN' : 'MANAGER';
      user = await prisma.user.create({
        data: {
          id: payload.sub || crypto.randomUUID(),
          authId: payload.sub,
          email: payload.email,
          name: payload.email.split('@')[0],
          role: role,
          status: 'ACTIVE',
        },
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ error: 'Authentication check failed' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
};

const requireManagerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'ADMIN' || req.user.role === 'MANAGER')) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Manager or Admin access required' });
  }
};

const restrictToFacility = (req, res, next) => {
  if (req.user && req.user.role === 'MANAGER') {
    req.query.facilityId = req.user.facilityId || req.user.assignedFacility;
  }
  next();
};

app.use('/api', async (req, res, next) => {
  if (req.path === '/status' || req.path === '/bins/telemetry') {
    return next();
  }
  await requireAuth(req, res, next);
});

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

function formatUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email ?? null,
    role: user.role ?? null,
    status: user.status,
    rating: user.rating ?? 0,
    avatar: user.avatar ?? null,
    assignedFacility: user.assignedFacility ?? null,
    region: user.region ?? null,
    authId: user.authId ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
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

const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = "https://xcewrpvxfjsxmwdocxqh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjZXdycHZ4ZmpzeG13ZG9jeHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwOTc2MTksImV4cCI6MjA5NDY3MzYxOX0.6h_q5VokTNKlteK62qkkgmqY219j-khDx7JhsofE1VY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// The route where your Raspberry Pi will eventually send bin data
app.post('/api/bins/telemetry', async (req, res) => {
  try {
    // 1. Extract the data the Pi sent in the request body
    const { customBinId, location, fillLevel, lastSortedItem, confidence, status: itemStatus, imageBase64 } = req.body;

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

    let imageUrl = null;
    
    // Upload image if provided
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
          console.log("Image uploaded to:", imageUrl);
        }
      } catch (err) {
        console.error("Error processing image upload:", err);
      }
    }

    // 3. Create a ProcessedItem record for analytics!
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
      
      // Also log an event
      await prisma.deviceEvent.create({
        data: {
          deviceId: updatedBin.id,
          eventType: "ITEM_SORTED",
          description: `Sorted item: ${lastSortedItem} (${(confidence || 95.0).toFixed(1)}% confidence)`,
          severity: "INFO"
        }
      });
    }

    console.log(`Successfully updated bin: ${customBinId} | Fill Level: ${fillLevel}%`);

    // 4. Send a success message back to the Pi
    res.status(200).json({ status: "success", data: updatedBin });

  } catch (error) {
    console.error("Error saving bin data:", error);
    res.status(500).json({ error: "Failed to save data to the database" });
  }
});


// PATCH a device (Manager Only)
app.patch('/api/devices/:id', requireManagerOrAdmin, async (req, res) => {
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
app.get('/api/devices', restrictToFacility, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const facilityId = req.query.facilityId;

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
app.get('/api/collectors', restrictToFacility, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const facilityId = req.query.facilityId;
    const skip = (page - 1) * limit;

    const whereClause = {
      role: 'COLLECTOR',
      ...(facilityId ? { facilityId } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { region: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [collectors, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({ where: whereClause }),
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
app.get('/api/users', requireManagerOrAdmin, restrictToFacility, async (req, res) => {
  try {
    const facilityId = req.query.facilityId;
    const where = facilityId ? { facilityId } : {};

    const users = await prisma.user.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    res.status(200).json(users.map(formatUser));
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// --- Admin Multi-Facility Dashboard Endpoints ---

// GET list of facilities with metrics
app.get('/api/admin/facilities', async (req, res) => {
  try {
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

    const data = facilities.map(f => {
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

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({ error: 'Failed to fetch facilities' });
  }
});

// GET global admin metrics across all facilities
app.get('/api/admin/global-metrics', async (req, res) => {
  try {
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

    res.status(200).json({
      facilitiesCount,
      activeFacilitiesCount,
      deviceStatus: `${activeDevicesCount}/${devicesCount}`,
      totalItemsSorted: totalProcessed.toLocaleString(),
      recyclingRate,
      contaminationRate,
      totalPendingTonnage: parseFloat(totalPendingTonnage.toFixed(1)),
      criticalAlertsCount: criticalAlerts
    });
  } catch (error) {
    console.error('Error fetching global admin metrics:', error);
    res.status(500).json({ error: 'Failed to fetch global admin metrics' });
  }
});

// GET bulk collection jobs
app.get('/api/admin/bulk-jobs', async (req, res) => {
  try {
    const jobs = await prisma.bulkCollectionJob.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        facility: {
          select: { name: true }
        }
      }
    });

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching bulk collection jobs:', error);
    res.status(500).json({ error: 'Failed to fetch bulk collection jobs' });
  }
});

// POST schedule a new bulk collection job
app.post('/api/admin/bulk-jobs', async (req, res) => {
  try {
    const { facilityId, tonnage, collectorName, collectorId, scheduledFor } = req.body;

    if (!facilityId || !tonnage) {
      return res.status(400).json({ error: 'facilityId and tonnage are required' });
    }

    const job = await prisma.bulkCollectionJob.create({
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

    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating bulk collection job:', error);
    res.status(500).json({ error: 'Failed to create bulk collection job' });
  }
});

// PATCH bulk collection job (status/assignment)
app.patch('/api/admin/bulk-jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, collectorId, collectorName } = req.body;

    const updateData = {};
    if (status !== undefined) {
      updateData.status = status;
      if (status === 'Completed') {
        updateData.completedAt = new Date();
      }
    }
    if (collectorId !== undefined) updateData.collectorId = collectorId;
    if (collectorName !== undefined) updateData.collectorName = collectorName;

    const job = await prisma.bulkCollectionJob.update({
      where: { id },
      data: updateData,
      include: {
        facility: {
          select: { name: true }
        }
      }
    });

    res.status(200).json(job);
  } catch (error) {
    console.error('Error updating bulk collection job:', error);
    res.status(500).json({ error: 'Failed to update bulk collection job' });
  }
});

// Create a collector invite record
app.post('/api/collectors', async (req, res) => {
  try {
    const { name, email, region, status, rating } = req.body;

    if (!name || !region) {
      return res.status(400).json({ error: 'Name and region are required' });
    }

    const createdCollector = await prisma.user.create({
      data: {
        name,
        email: email || null,
        region,
        role: 'COLLECTOR',
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
      where: { id },
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
app.post('/api/users', requireManagerOrAdmin, async (req, res) => {
  try {
    let { name, email, role, status, assignedFacility, avatar, facilityId } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Name, email, and role are required' });
    }

    // Force facility scopes for Managers
    if (req.user.role === 'MANAGER') {
      facilityId = req.user.facilityId;
      assignedFacility = req.user.assignedFacility;
    }

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        status: status || 'PENDING',
        assignedFacility: assignedFacility || 'Unassigned',
        facilityId: facilityId || null,
        avatar: avatar || null,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "New User Invited",
        actorName: req.user?.name || "System",
        details: `${req.user?.name || "System"} invited ${createdUser.name} as ${createdUser.role}.`,
        color: "text-[#006c49]",
      },
    });

    res.status(201).json(formatUser(createdUser));
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update a platform user record
app.patch('/api/users/:id', requireManagerOrAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status, assignedFacility, avatar } = req.body;

    const originalUser = await prisma.user.findUnique({ where: { id } });
    if (!originalUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Security check: Manager can only update users within their facility
    if (req.user.role === 'MANAGER') {
      if (originalUser.facilityId !== req.user.facilityId) {
        return res.status(403).json({ error: 'Forbidden: You can only manage users in your facility' });
      }
      if (assignedFacility !== undefined && assignedFacility !== req.user.assignedFacility) {
        return res.status(403).json({ error: 'Forbidden: Managers cannot change user facility assignments' });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(role !== undefined ? { role } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(assignedFacility !== undefined ? { assignedFacility } : {}),
        ...(avatar !== undefined ? { avatar: avatar || null } : {}),
      },
    });

    // Audit logs for role update or status suspensions
    if (role !== undefined && role !== originalUser.role) {
      await prisma.auditLog.create({
        data: {
          action: "User Role Updated",
          actorName: req.user?.name || "System",
          details: `${req.user?.name || "System"} changed ${updatedUser.name}'s role from ${originalUser.role} to ${role}.`,
          color: "text-foreground dark:text-white"
        }
      });
    }

    if (status !== undefined && status !== originalUser.status && (status === 'SUSPENDED' || status === 'Suspended' || status === 'Inactive')) {
      await prisma.auditLog.create({
        data: {
          action: "User Removed",
          actorName: req.user?.name || "System",
          details: `${req.user?.name || "System"} suspended user ${updatedUser.name}.`,
          color: "text-[#ba1a1a]"
        }
      });
    }

    res.status(200).json(formatUser(updatedUser));
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// GET collection jobs derived from the database
app.get('/api/jobs', restrictToFacility, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const facilityId = req.query.facilityId;
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
app.post('/api/jobs', requireManagerOrAdmin, async (req, res) => {
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
app.patch('/api/jobs/:id', requireManagerOrAdmin, async (req, res) => {
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

// GET summary metrics for the collection jobs page KPIs
app.get('/api/jobs/summary', restrictToFacility, async (req, res) => {
  try {
    const facilityId = req.query.facilityId;
    const deviceWhere = facilityId ? { device: { facilityId } } : {};

    const [pendingCount, inProgressCount, completedCount, activeCollectorsCount, totalCollectors] = await Promise.all([
      prisma.collectionJob.count({ where: { ...deviceWhere, status: 'Pending' } }),
      prisma.collectionJob.count({ where: { ...deviceWhere, status: 'In Progress' } }),
      prisma.collectionJob.count({ where: { ...deviceWhere, status: 'Completed' } }),
      prisma.user.count({ where: { role: 'COLLECTOR', status: 'ACTIVE' } }),
      prisma.user.count({ where: { role: 'COLLECTOR' } }),
    ]);

    // calculate avg response time (simulated based on real completed/pending count)
    const avgResponseMinutes = completedCount > 0 ? Math.max(12, Math.round(180 / completedCount)) : 18;
    const avgResponseSeconds = Math.round((180 % (completedCount || 1)) * 60 / (completedCount || 1)) % 60;
    const responseTimeStr = `${avgResponseMinutes}m ${String(avgResponseSeconds).padStart(2, '0')}s`;

    // tonnage goal calculation: completed jobs * 0.25 Tons (250kg) vs 10 Tons target
    const tonnageCollected = completedCount * 0.25;
    const targetTonnage = 10;
    const tonnageGoalPercent = Math.min(100, Math.round((tonnageCollected / targetTonnage) * 100));

    res.status(200).json({
      pendingJobs: pendingCount,
      avgResponseTime: responseTimeStr,
      activeCollectors: `${String(activeCollectorsCount).padStart(2, '0')}`,
      totalCollectors: `${String(totalCollectors).padStart(2, '0')}`,
      tonnageGoal: `${tonnageGoalPercent}%`
    });
  } catch (error) {
    console.error('Error fetching jobs summary:', error);
    res.status(500).json({ error: 'Failed to fetch jobs summary' });
  }
});

// GET audit logs (Admin only)
app.get('/api/audit-logs', requireAdmin, async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// POST audit logs (allows frontend/auth to log security warnings/failed logins)
app.post('/api/audit-logs', async (req, res) => {
  try {
    const { action, actorName, details, color } = req.body;
    const log = await prisma.auditLog.create({
      data: {
        action: action || 'Security Alert',
        actorName: actorName || 'System',
        details: details || '',
        color: color || 'text-foreground',
      },
    });
    res.status(201).json(log);
  } catch (error) {
    console.error('Error creating audit log:', error);
    res.status(500).json({ error: 'Failed to create audit log' });
  }
});

// GET dashboard summary for pages that need DB-driven KPI snapshots
app.get('/api/dashboard/summary', restrictToFacility, async (req, res) => {
  try {
    const facilityId = req.query.facilityId;
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
app.get('/api/dashboard/metrics', restrictToFacility, async (req, res) => {
  try {
    const facilityId = req.query.facilityId;
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

    res.status(200).json({
      deviceStatus: `${activeDevicesCount}/${devicesCount}`,
      totalItemsSorted: totalProcessed.toLocaleString(),
      recyclingRate,
      contaminationRate,
    });
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
});

// GET hourly throughput counts grouped by hour
app.get('/api/dashboard/throughput', restrictToFacility, async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const facilityId = req.query.facilityId;
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
app.get('/api/dashboard/waste-categories', restrictToFacility, async (req, res) => {
  try {
    const facilityId = req.query.facilityId;
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

    res.status(200).json({
      total: totalProcessed,
      categories: data,
    });
  } catch (error) {
    console.error('Error fetching waste categories:', error);
    res.status(500).json({ error: 'Failed to fetch waste categories' });
  }
});

// GET live contamination/rejection events joined with Device
app.get('/api/dashboard/contamination-events', restrictToFacility, async (req, res) => {
  try {
    const facilityId = req.query.facilityId;
    const itemWhere = facilityId ? { device: { facilityId }, status: 'Rejected' } : { status: 'Rejected' };

    const recentRejections = await prisma.processedItem.findMany({
      where: itemWhere,
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
app.get('/api/alerts', requireAdmin, async (req, res) => {
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
app.get('/api/alerts/summary', requireAdmin, async (req, res) => {
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
app.get('/api/analytics/historical', restrictToFacility, async (req, res) => {
  try {
    const facilityId = req.query.facilityId;
    const itemWhere = facilityId ? { device: { facilityId } } : {};
    
    // Fetch all processed items for the past 5 weeks in a single query
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

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching historical analytics:', error);
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
app.get('/api/feedback', requireManagerOrAdmin, async (req, res) => {
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
app.patch('/api/feedback/:id', requireManagerOrAdmin, async (req, res) => {
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