const express = require('express');
const router = express.Router();
const routeOptimizationController = require('../controllers/routeOptimizationController');
const { requireManagerOrAdmin, restrictToFacility } = require('../middleware/auth');

router.get('/forecast', restrictToFacility, routeOptimizationController.getForecast);
router.post('/optimize', requireManagerOrAdmin, routeOptimizationController.optimizeRoute);
router.post('/dispatch', requireManagerOrAdmin, routeOptimizationController.dispatchRoute);

module.exports = router;

