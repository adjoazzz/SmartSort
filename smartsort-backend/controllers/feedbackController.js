const feedbackService = require('../services/feedbackService');

class FeedbackController {
  async getFeedback(req, res, next) {
    try {
      const feedbackList = await feedbackService.getFeedback();
      res.status(200).json(feedbackList);
    } catch (err) {
      next(err);
    }
  }

  async createFeedback(req, res, next) {
    try {
      const newFeedback = await feedbackService.createFeedback(req.body);
      res.status(201).json(newFeedback);
    } catch (err) {
      next(err);
    }
  }

  async updateFeedback(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedFeedback = await feedbackService.updateFeedback(id, status);
      res.status(200).json(updatedFeedback);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FeedbackController();
