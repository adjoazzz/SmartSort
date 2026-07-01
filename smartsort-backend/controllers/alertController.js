const alertService = require('../services/alertService');

class AlertController {
  async getAlerts(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const data = await alertService.getAlerts(page, limit);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async getAlertsSummary(req, res, next) {
    try {
      const summary = await alertService.getAlertsSummary();
      res.status(200).json(summary);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AlertController();
