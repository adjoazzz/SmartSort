const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const start = Date.now();
  req.logger = logger;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const size = res.get('Content-Length') || 0;
    
    logger.info(`HTTP ${req.method} ${req.originalUrl}`, {
      method: req.method,
      url: req.originalUrl,
      queryParams: req.query,
      userId: req.user ? req.user.id : null,
      userEmail: req.user ? req.user.email : null,
      statusCode: res.statusCode,
      responseTimeMs: duration,
      responseSize: size,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      requestId: req.requestId,
    });
  });

  next();
};

module.exports = { requestLogger };
