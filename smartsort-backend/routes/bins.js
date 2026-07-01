const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const { webhookLimiter } = require('../middleware/rateLimit');

router.post('/telemetry', webhookLimiter, deviceController.saveTelemetry);

module.exports = router;
