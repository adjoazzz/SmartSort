const auditService = require('../services/auditService');

class AuditController {
  async getAuditLogs(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 20;
      const { logs, total } = await auditService.getAuditLogs(page, limit);
      res.status(200).json({
        data: logs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async createAuditLog(req, res, next) {
    try {
      const log = await auditService.createAuditLog(req.body);
      res.status(201).json(log);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuditController();
