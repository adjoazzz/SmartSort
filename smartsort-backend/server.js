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

// Define the port (uses the one in .env, or defaults to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});