const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { restrictToFacility } = require('../middleware/auth');

router.get('/summary', restrictToFacility, dashboardController.getDashboardSummary);
router.get('/metrics', restrictToFacility, dashboardController.getDashboardMetrics);
router.get('/throughput', restrictToFacility, dashboardController.getThroughput);
router.get('/waste-categories', restrictToFacility, dashboardController.getWasteCategories);
router.get('/contamination-events', restrictToFacility, dashboardController.getContaminationEvents);

module.exports = router;
