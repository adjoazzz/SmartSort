const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const dashboardController = require('../controllers/dashboardController');
const { requireAdmin } = require('../middleware/auth');
const { bulkLimiter } = require('../middleware/rateLimit');

router.use(requireAdmin);

router.get('/facilities', dashboardController.getFacilities);
router.get('/global-metrics', dashboardController.getGlobalMetrics);

router.get('/bulk-jobs', jobController.getBulkJobs);
router.post('/bulk-jobs', bulkLimiter, jobController.createBulkJob);
router.patch('/bulk-jobs/:id', bulkLimiter, jobController.updateBulkJob);

module.exports = router;
