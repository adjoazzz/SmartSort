const express = require('express');
const router = express.Router();
const routeOptimizationController = require('../controllers/routeOptimizationController');
const { requireAdmin } = require('../middleware/auth');

router.get('/forecast', requireAdmin, routeOptimizationController.getForecast);
router.post('/optimize', requireAdmin, routeOptimizationController.optimizeRoute);
router.post('/dispatch', requireAdmin, routeOptimizationController.dispatchRoute);

module.exports = router;

