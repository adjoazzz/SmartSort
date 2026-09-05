// IMPORTANT: Require instrument.js at the top before any other modules
const Sentry = require('./instrument');
const express = require('express');
const cors = require('cors');


// Startup Env Check
const requiredEnvVars = ['DATABASE_URL', 'SUPABASE_URL', 'SUPABASE_ANON_KEY'];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`FATAL ERROR: Environment variable ${varName} is missing.`);
    process.exit(1);
  }
});

const { requestId } = require('./middleware/requestId');
const { requestLogger } = require('./middleware/logging');
const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');
const logger = require('./utils/logger');
const { prisma } = require('./lib/prisma');

// Initialize the Express app
const app = express();

// Global Middlewares
app.use(requestId);
app.use(requestLogger);
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected',
      version: '1.0.0',
    });
  } catch (err) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: err.message,
    });
  }
});

// Sentry Test / Debug Endpoint
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// API Router
app.use('/api', routes);

// Sentry Error Handler must be registered after all routes and before custom error handlers
Sentry.setupExpressErrorHandler(app);

// Global Error Handler
app.use(errorHandler);



// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

// Global safety nets — prevent uncaught errors from crashing the server
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Promise Rejection:', { reason: reason?.message || reason, stack: reason?.stack });
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', { message: err.message, stack: err.stack });
  // Give the logger time to flush, then exit (uncaught exceptions leave the process in an undefined state)
  setTimeout(() => process.exit(1), 1000);
});

// Server export
module.exports = app;