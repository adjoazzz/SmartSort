const express = require('express');
const cors = require('cors');
require('dotenv').config();

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
app.post('/api/bins/telemetry', (req, res) => {
  const binData = req.body;
  console.log("Received data from Smart Bin:", binData);
  
  // For now, just send a success response back to the Pi
  res.status(200).json({ status: "success", received: true });
});

// Define the port (uses the one in .env, or defaults to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});