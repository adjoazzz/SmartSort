const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { requireManagerOrAdmin } = require('../middleware/auth');

router.get('/', requireManagerOrAdmin, feedbackController.getFeedback);
router.post('/', feedbackController.createFeedback);
router.patch('/:id', requireManagerOrAdmin, feedbackController.updateFeedback);

module.exports = router;
