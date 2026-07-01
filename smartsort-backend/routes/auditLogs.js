const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const { requireAdmin } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { schemas } = require('../utils/validators');

router.get('/', requireAdmin, auditController.getAuditLogs);
router.post('/', validate(schemas.auditLog.create), auditController.createAuditLog);

module.exports = router;
