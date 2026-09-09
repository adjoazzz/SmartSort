const cron = require('node-cron');
const jobService = require('../services/jobService');
const { prisma } = require('../lib/prisma');
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

      // Create Alert records so the Manager Dashboard notification sidebar picks them up in real-time
      const alertsData = result.createdJobs.map((job) => {
        const severity = job.urgency === 'Critical' ? 'CRITICAL' : job.urgency === 'High' ? 'WARNING' : 'INFO';
        // Extract deviceId from the job — we need to look it up from the original DB record
        return {
          severity,
          title: `Auto-scheduled: ${job.location}`,
          description: `Bin at ${job.location} reached ${job.fill}% capacity. A collection job has been automatically created.`,
          status: 'Active',
        };
      });

      // We need the actual device IDs for the Alert records — query them from the created jobs
      for (const createdJob of result.createdJobs) {
        const dbJob = await prisma.collectionJob.findUnique({
          where: { id: createdJob.id },
          select: { deviceId: true },
        });

        if (dbJob) {
          const severity = createdJob.urgency === 'Critical' ? 'CRITICAL' : createdJob.urgency === 'High' ? 'WARNING' : 'INFO';
          await prisma.alert.create({
            data: {
              deviceId: dbJob.deviceId,
              severity,
              title: `Auto-scheduled: ${createdJob.location}`,
              description: `Bin at ${createdJob.location} reached ${createdJob.fill}% capacity. A collection job has been automatically created.`,
              status: 'Active',
            },
          });
        }
      }

      logger.info(`Created ${result.createdCount} alert(s) for auto-scheduled jobs.`);
    }
  } catch (error) {
    logger.error(`Error running auto schedule cron job: ${error.message}`);
  }
});
