const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

// Sentry Initialization
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0, 
  profilesSampleRate: 1.0,
});

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

// Sentry Request Handler must be the first middleware on the app
Sentry.setupExpressErrorHandler(app);

// Global Middlewares
app.use(requestId);
app.use(requestLogger);
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health Check Endpoint (Phase 8.2)
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

// API Router
app.use('/api', routes);

// The error handler must be registered before any other error middleware and after all controllers
// Wait, Sentry.setupExpressErrorHandler(app) automatically registers handlers in v8.
// We just need to ensure our global errorHandler comes after.

// Global Error Handler
app.use(errorHandler);

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;