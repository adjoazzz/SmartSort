const fs = require('fs');

let code = fs.readFileSync('server.js', 'utf8');

// 1. Add Supabase Client
code = code.replace(
  "const { Pool } = require('pg');\nrequire('dotenv').config();",
  "const { Pool } = require('pg');\nconst { createClient } = require('@supabase/supabase-js');\nrequire('dotenv').config();"
);

// 2. Add auth middleware
const authLogic = `
const supabaseUrl = process.env.VITE_API_BASE_URL || "https://xcewrpvxfjsxmwdocxqh.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjZXdycHZ4ZmpzeG13ZG9jeHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwOTc2MTksImV4cCI6MjA5NDY3MzYxOX0.6h_q5VokTNKlteK62qkkgmqY219j-khDx7JhsofE1VY";
const supabase = createClient(supabaseUrl, supabaseKey);

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const dbUser = await prisma.user.findUnique({ where: { authId: user.id } });
  req.user = dbUser || { authId: user.id, email: user.email, role: 'MANAGER' };
  next();
}

function requireManager(req, res, next) {
  if (req.user && req.user.role === 'MANAGER') {
    next();
  } else {
    return res.status(403).json({ error: 'Forbidden: Managers only' });
  }
}

// Global Auth Middleware
app.use((req, res, next) => {
  if (['/api/status', '/api/bins/telemetry', '/api/auth/sync'].includes(req.path)) {
    return next();
  }
  return authMiddleware(req, res, next);
});
`;

code = code.replace(
  "// Middleware\napp.use(cors()); // Allows your React app to make requests here\napp.use(express.json()); // Allows the server to understand JSON data from the Raspberry Pi",
  "// Middleware\napp.use(cors()); // Allows your React app to make requests here\napp.use(express.json()); // Allows the server to understand JSON data from the Raspberry Pi\n" + authLogic
);

// 3. Formatters
code = code.replace(
  /function formatCollector\([\s\S]*?\}\n\}/g,
  `function formatUser(user) {
  return {
    id: user.id,
    authId: user.authId,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    region: user.region,
    avatar: user.avatar,
    assignedFacility: user.assignedFacility,
    rating: user.rating,
  };
}`
);

code = code.replace(/function formatPlatformUser\([\s\S]*?\}\n\}/g, '');

// 4. Endpoints
code = code.replace(
  /prisma\.collector\.findMany/g,
  "prisma.user.findMany"
);

code = code.replace(
  /prisma\.platformUser\.findMany/g,
  "prisma.user.findMany"
);

// Since both are replaced by prisma.user.findMany, let's refine it manually to filter by role
// Replace collectors endpoint
code = code.replace(
  /prisma\.user\.findMany\(\{\n\s*orderBy: \{ updatedAt: 'desc' \},\n\s*skip,\n\s*take: limit,\n\s*\}\)/,
  "prisma.user.findMany({\n        where: { role: 'COLLECTOR' },\n        orderBy: { updatedAt: 'desc' },\n        skip,\n        take: limit,\n      })"
);
code = code.replace(/prisma\.collector\.count\(\)/, "prisma.user.count({ where: { role: 'COLLECTOR' } })");

// Replace users endpoint
code = code.replace(
  /prisma\.user\.findMany\(\{\n\s*orderBy: \{ updatedAt: 'desc' \},\n\s*\}\)/,
  "prisma.user.findMany({\n      where: { role: { not: 'COLLECTOR' } },\n      orderBy: { updatedAt: 'desc' },\n    })"
);

code = code.replace(/formatCollector/g, "formatUser");
code = code.replace(/formatPlatformUser/g, "formatUser");

// Replace Create Collector
code = code.replace(
  /prisma\.collector\.create\(\{\n\s*data: \{\n\s*collectorId,\n\s*name,\n\s*email: email \|\| null,\n\s*region,\n\s*status: status \|\| 'Pending',\n\s*rating: Number\(rating\) \|\| 0,\n\s*\},\n\s*\}\)/,
  "prisma.user.create({\n      data: {\n        id: collectorId,\n        name,\n        email: email || '',\n        role: 'COLLECTOR',\n        region,\n        status: status || 'Pending',\n        rating: Number(rating) || 0,\n      },\n    })"
);

// Replace Update Collector
code = code.replace(
  /prisma\.collector\.update\(\{\n\s*where: \{ collectorId: id \},\n\s*data: \{\n\s*\.\.\.\(name !== undefined \? \{ name \} : \{\}\),\n\s*\.\.\.\(email !== undefined \? \{ email: email \|\| null \} : \{\}\),\n\s*\.\.\.\(region !== undefined \? \{ region \} : \{\}\),\n\s*\.\.\.\(status !== undefined \? \{ status \} : \{\}\),\n\s*\.\.\.\(rating !== undefined \? \{ rating: Number\(rating\) \|\| 0 \} : \{\}\),\n\s*\},\n\s*\}\)/,
  "prisma.user.update({\n      where: { id: id },\n      data: {\n        ...(name !== undefined ? { name } : {}),\n        ...(email !== undefined ? { email: email || '' } : {}),\n        ...(region !== undefined ? { region } : {}),\n        ...(status !== undefined ? { status } : {}),\n        ...(rating !== undefined ? { rating: Number(rating) || 0 } : {}),\n      },\n    })"
);

// Replace Create User
code = code.replace(
  /prisma\.platformUser\.create\(\{\n\s*data: \{\n\s*userId,\n\s*name,\n\s*email,\n\s*role,\n\s*status: status \|\| 'PENDING',\n\s*assignedFacility: assignedFacility \|\| 'Unassigned',\n\s*avatar: avatar \|\| null,\n\s*\},\n\s*\}\)/,
  "prisma.user.create({\n      data: {\n        id: userId,\n        name,\n        email,\n        role,\n        status: status || 'PENDING',\n        assignedFacility: assignedFacility || 'Unassigned',\n        avatar: avatar || null,\n      },\n    })"
);

// Replace Update User
code = code.replace(
  /prisma\.platformUser\.update\(\{\n\s*where: \{ userId: id \},\n\s*data: \{\n\s*\.\.\.\(name !== undefined \? \{ name \} : \{\}\),\n\s*\.\.\.\(email !== undefined \? \{ email \} : \{\}\),\n\s*\.\.\.\(role !== undefined \? \{ role \} : \{\}\),\n\s*\.\.\.\(status !== undefined \? \{ status \} : \{\}\),\n\s*\.\.\.\(assignedFacility !== undefined \? \{ assignedFacility \} : \{\}\),\n\s*\.\.\.\(avatar !== undefined \? \{ avatar: avatar \|\| null \} : \{\}\),\n\s*\},\n\s*\}\)/,
  "prisma.user.update({\n      where: { id: id },\n      data: {\n        ...(name !== undefined ? { name } : {}),\n        ...(email !== undefined ? { email } : {}),\n        ...(role !== undefined ? { role } : {}),\n        ...(status !== undefined ? { status } : {}),\n        ...(assignedFacility !== undefined ? { assignedFacility } : {}),\n        ...(avatar !== undefined ? { avatar: avatar || null } : {}),\n      },\n    })"
);

// Also replace buildNextSequentialId models
code = code.replace(/prisma\.collector/g, "prisma.user");
code = code.replace(/prisma\.platformUser/g, "prisma.user");
code = code.replace(/'collectorId'/g, "'id'");
code = code.replace(/'userId'/g, "'id'");

// Add an endpoint to update devices and protect with requireManager
const deviceUpdateEndpoint = `
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
`;

code = code.replace("// GET route for the React Frontend to fetch all bin statuses", deviceUpdateEndpoint + "\n// GET route for the React Frontend to fetch all bin statuses");

// Add /api/auth/sync endpoint
const authSyncEndpoint = `
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
`;

code = code.replace("// GET users for the user management page", authSyncEndpoint + "\n// GET users for the user management page");

fs.writeFileSync('server.js', code);
console.log('Successfully patched server.js');
