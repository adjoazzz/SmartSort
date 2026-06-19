const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
});

async function main() {
    await prisma.deviceEvent.deleteMany();

    const devices = await prisma.device.findMany();
    if (!devices || devices.length === 0) {
        console.log("No devices found, cannot seed events.");
        return;
    }

    const deviceEventsData = [];
    const eventTypes = ['POWER_CYCLE', 'NETWORK_SYNC', 'SENSOR_UPDATE', 'MAINTENANCE', 'FIRMWARE_UPDATE'];
    const baseDate = new Date();
    
    for (let i = 0; i < 30; i++) {
        const randomDevice = devices[Math.floor(Math.random() * devices.length)];
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const severity = eventType === 'MAINTENANCE' ? 'WARNING' : (eventType === 'POWER_CYCLE' ? 'CRITICAL' : 'INFO');
        
        let description = '';
        switch(eventType) {
            case 'POWER_CYCLE': description = 'Scheduled maintenance restart completed.'; break;
            case 'NETWORK_SYNC': description = 'Cloud handshake successful. Log batch transmitted.'; break;
            case 'SENSOR_UPDATE': description = 'Sensor recalibration complete.'; break;
            case 'MAINTENANCE': description = 'Bin was manually emptied and reset.'; break;
            case 'FIRMWARE_UPDATE': description = 'Firmware updated to v2.4.1.'; break;
        }

        const pastDate = new Date(baseDate);
        pastDate.setHours(pastDate.getHours() - Math.floor(Math.random() * 72));

        deviceEventsData.push({
            deviceId: randomDevice.id,
            eventType: eventType,
            description: description,
            severity: severity,
            createdAt: pastDate,
        });
    }

    await prisma.deviceEvent.createMany({
        data: deviceEventsData,
    });

    console.log('Seeded mock device events successfully.');
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
