const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const maskSensitive = winston.format((info) => {
  const maskFields = ['password', 'token', 'authorization', 'accesstoken', 'refreshtoken', 'x-mock-role'];
  const maskData = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    // Check if it's an Array
    if (Array.isArray(obj)) {
      return obj.map(maskData);
    }
    const cloned = { ...obj };
    for (const key in cloned) {
      if (maskFields.includes(key.toLowerCase())) {
        cloned[key] = '********';
      } else if (typeof cloned[key] === 'object') {
        cloned[key] = maskData(cloned[key]);
      }
    }
    return cloned;
  };
  // format receives a winston Info object
  return maskData(info);
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    maskSensitive(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
          let output = `[${timestamp}] ${level}: ${message}`;
          if (Object.keys(meta).length > 0) {
            output += ` ${JSON.stringify(meta)}`;
          }
          if (stack) {
            output += `\n${stack}`;
          }
          return output;
        })
      )
    }),
    new DailyRotateFile({
      dirname: path.join(__dirname, '../logs'),
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    })
  ]
});

module.exports = logger;
