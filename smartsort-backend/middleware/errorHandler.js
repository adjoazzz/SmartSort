const AppError = require('../utils/errorHandler');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let code = err.code || 'INTERNAL_ERROR';
  let message = err.message || 'An unexpected error occurred';
  
  if (err.code && typeof err.code === 'string' && err.code.startsWith('P')) {
    statusCode = 500;
    code = 'DB_ERROR';
    message = 'A database error occurred';
  }

  const errorResponse = {
    error: {
      code,
      message,
      requestId: req.requestId || null,
      timestamp: err.timestamp || new Date().toISOString(),
    },
    status: statusCode,
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
  }

  // Use winston logger if available on the request object
  if (req.logger) {
    req.logger.error(message, {
      code,
      statusCode,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      requestId: req.requestId,
    });
  } else {
    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = { errorHandler };
