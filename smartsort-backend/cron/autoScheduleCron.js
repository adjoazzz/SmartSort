const cron = require('node-cron');
const jobService = require('../services/jobService');
const logger = require('../utils/logger');

// Run every minute to check for full bins
cron.schedule('* * * * *', async () => {
  try {
    // 80% threshold, no auto-assignment (leaves jobs pending for manager to assign)
    const result = await jobService.autoScheduleJobs({
      threshold: 80,
      autoAssign: false,
    });
    
    if (result.createdCount > 0) {
      logger.info(result.message);
    }
  } catch (error) {
    logger.error(`Error running auto schedule cron job: ${error.message}`);
  }
});
