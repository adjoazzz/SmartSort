const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { requireManagerOrAdmin, requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, requireManagerOrAdmin, feedbackController.getFeedback);
router.post('/', feedbackController.createFeedback);
router.patch('/:id', requireAuth, requireManagerOrAdmin, feedbackController.updateFeedback);

module.exports = router;
