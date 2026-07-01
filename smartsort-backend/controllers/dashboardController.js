const dashboardService = require('../services/dashboardService');

class DashboardController {
  async getDashboardSummary(req, res, next) {
    try {
      const facilityId = req.query.facilityId;
      const summary = await dashboardService.getDashboardSummary(facilityId);
      res.status(200).json(summary);
    } catch (err) {
      next(err);
    }
  }

  async getDashboardMetrics(req, res, next) {
    try {
      const facilityId = req.query.facilityId;
      const metrics = await dashboardService.getDashboardMetrics(facilityId);
      res.status(200).json(metrics);
    } catch (err) {
      next(err);
    }
  }

  async getThroughput(req, res, next) {
    try {
      const facilityId = req.query.facilityId;
      const throughput = await dashboardService.getThroughput(facilityId);
      res.status(200).json(throughput);
    } catch (err) {
      next(err);
    }
  }

  async getWasteCategories(req, res, next) {
    try {
      const facilityId = req.query.facilityId;
      const categories = await dashboardService.getWasteCategories(facilityId);
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  async getContaminationEvents(req, res, next) {
    try {
      const facilityId = req.query.facilityId;
      const events = await dashboardService.getContaminationEvents(facilityId);
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  }

  async getHistoricalAnalytics(req, res, next) {
    try {
      const facilityId = req.query.facilityId;
      const data = await dashboardService.getHistoricalAnalytics(facilityId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async getFacilities(req, res, next) {
    try {
      const data = await dashboardService.getFacilitiesList();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async getGlobalMetrics(req, res, next) {
    try {
      const data = await dashboardService.getGlobalAdminMetrics();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DashboardController();
