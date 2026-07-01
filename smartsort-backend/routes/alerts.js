const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { requireAdmin } = require('../middleware/auth');

router.use(requireAdmin);

router.get('/', alertController.getAlerts);
router.get('/summary', alertController.getAlertsSummary);

module.exports = router;
