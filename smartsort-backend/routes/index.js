const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

const authRouter = require('./auth');
const usersRouter = require('./users');
const collectorsRouter = require('./collectors');
const devicesRouter = require('./devices');
const binsRouter = require('./bins');
const jobsRouter = require('./jobs');
const adminRouter = require('./admin');
const dashboardRouter = require('./dashboard');
const alertsRouter = require('./alerts');
const feedbackRouter = require('./feedback');
const auditLogsRouter = require('./auditLogs');
const analyticsRouter = require('./analytics');

// Public / Unauthenticated routes
router.use('/auth', authRouter);
router.use('/bins', binsRouter);
router.use('/feedback', feedbackRouter); // POST feedback is public, other actions are guarded in the feedback router

router.get('/status', (req, res) => {
  res.json({ message: "SmartSort Backend is running perfectly!" });
});

router.get('/metrics', (req, res) => {
  const memoryUsage = process.memoryUsage();
  const uptime = process.uptime();
  
  res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
  
  let metricsStr = '';
  metricsStr += `# HELP process_uptime_seconds Uptime of the process in seconds\n`;
  metricsStr += `# TYPE process_uptime_seconds gauge\n`;
  metricsStr += `process_uptime_seconds ${uptime}\n\n`;
  
  metricsStr += `# HELP process_memory_rss_bytes Resident Set Size memory usage in bytes\n`;
  metricsStr += `# TYPE process_memory_rss_bytes gauge\n`;
  metricsStr += `process_memory_rss_bytes ${memoryUsage.rss}\n\n`;
  
  metricsStr += `# HELP process_memory_heap_used_bytes Heap used memory in bytes\n`;
  metricsStr += `# TYPE process_memory_heap_used_bytes gauge\n`;
  metricsStr += `process_memory_heap_used_bytes ${memoryUsage.heapUsed}\n\n`;

  res.status(200).send(metricsStr);
});

// Authenticated routes
router.use(requireAuth);

router.use('/users', usersRouter);
router.use('/collectors', collectorsRouter);
router.use('/devices', devicesRouter);
router.use('/jobs', jobsRouter);
router.use('/admin', adminRouter);
router.use('/dashboard', dashboardRouter);
router.use('/alerts', alertsRouter);
router.use('/audit-logs', auditLogsRouter);
router.use('/analytics', analyticsRouter);

module.exports = router;
