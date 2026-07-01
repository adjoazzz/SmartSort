const { prisma } = require('../lib/prisma');
const AppError = require('../utils/errorHandler');

class FeedbackService {
  async getFeedback() {
    return prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createFeedback(body) {
    const { userName, location, category, message } = body;
    if (!userName || !location || !category || !message) {
      throw new AppError('All fields (userName, location, category, message) are required', 400, 'VALIDATION_FAILED');
    }

    return prisma.feedback.create({
      data: {
        userName,
        location,
        category,
        message,
        status: "Pending"
      }
    });
  }

  async updateFeedback(id, status) {
    if (!status) {
      throw new AppError('Status is required', 400, 'VALIDATION_FAILED');
    }

    const feedbackExists = await prisma.feedback.findUnique({ where: { id } });
    if (!feedbackExists) {
      throw new AppError('Feedback not found', 404, 'NOT_FOUND');
    }

    return prisma.feedback.update({
      where: { id },
      data: { status }
    });
  }
}

module.exports = new FeedbackService();
