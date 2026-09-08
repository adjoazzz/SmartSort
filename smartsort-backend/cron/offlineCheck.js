const cron = require('node-cron');
const { prisma } = require('../lib/prisma');
const logger = require('../utils/logger');

// Run every minute to check for offline devices
cron.schedule('* * * * *', async () => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    // Find all devices that haven't sent telemetry in 5 minutes and aren't already marked Offline
    const offlineDevices = await prisma.device.findMany({
      where: {
        updatedAt: {
          lt: fiveMinutesAgo,
        },
        status: {
          not: 'Offline',
        },
      },
    });

    if (offlineDevices.length > 0) {
      logger.info(`Found ${offlineDevices.length} offline devices. Updating status and flagging admin.`);

      const alertsData = offlineDevices.map((device) => ({
        deviceId: device.id,
        severity: 'CRITICAL',
        title: 'Device Offline',
        description: `Device ${device.customBinId} missed telemetry heartbeats for over 5 minutes. Physical inspection required.`,
        status: 'Active',
      }));

      // Update their status to 'Offline'
      await prisma.device.updateMany({
        where: {
          id: {
            in: offlineDevices.map(d => d.id),
          },
        },
        data: {
          status: 'Offline',
        },
      });

      // Create an alert for each
      await prisma.alert.createMany({
        data: alertsData,
      });
      
      logger.info(`Offline devices updated and admin flagged successfully.`);
    }
  } catch (error) {
    logger.error(`Error running offline check cron job: ${error.message}`);
  }
});
