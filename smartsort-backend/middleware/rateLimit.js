const rateLimit = require('express-rate-limit');

// Login endpoint / general auth sync
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many login attempts, please try again later'
    },
    status: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  keyGenerator: (req) => {
    return req.user ? req.user.id : req.ip;
  },
  validate: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many requests, please try again later'
    },
    status: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Bulk operations
const bulkLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  keyGenerator: (req) => {
    return req.user ? req.user.id : req.ip;
  },
  validate: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many bulk operations, please try again later'
    },
    status: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Webhook / telemetry endpoints
const webhookLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Webhook rate limit exceeded'
    },
    status: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  loginLimiter,
  apiLimiter,
  bulkLimiter,
  webhookLimiter,
};
