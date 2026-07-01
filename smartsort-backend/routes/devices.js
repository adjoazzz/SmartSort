const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const { requireManagerOrAdmin, restrictToFacility } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { schemas } = require('../utils/validators');

router.get('/', restrictToFacility, deviceController.getDevices);
router.patch('/:id', requireManagerOrAdmin, validate(schemas.device.update), deviceController.updateDevice);
router.get('/:id/events', deviceController.getDeviceEvents);

module.exports = router;
