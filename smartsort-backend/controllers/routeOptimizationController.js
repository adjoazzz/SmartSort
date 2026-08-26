const forecastingService = require('../services/forecastingService');
const routeOptimizationService = require('../services/routeOptimizationService');

class RouteOptimizationController {
  async getForecast(req, res, next) {
    try {
      const facilityId = req.query.facilityId;
      const forecast = await forecastingService.predictBinFillLevels(facilityId);
      res.status(200).json(forecast);
    } catch (err) {
      next(err);
    }
  }

  async optimizeRoute(req, res, next) {
    try {
      const result = await routeOptimizationService.generateOptimizedRoute(req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async dispatchRoute(req, res, next) {
    try {
      const result = await routeOptimizationService.dispatchOptimizedRoute(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RouteOptimizationController();

