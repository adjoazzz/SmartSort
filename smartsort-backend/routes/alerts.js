const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { requireManagerOrAdmin } = require('../middleware/auth');

router.use(requireManagerOrAdmin);

router.get('/', alertController.getAlerts);
router.get('/summary', alertController.getAlertsSummary);

module.exports = router;
