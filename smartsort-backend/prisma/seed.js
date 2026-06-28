const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
});

async function main() {
    // Delete existing records
    await prisma.bulkCollectionJob.deleteMany();
    await prisma.collectionJob.deleteMany();
    await prisma.processedItem.deleteMany();
    await prisma.deviceEvent.deleteMany();
    await prisma.alert.deleteMany();
    await prisma.device.deleteMany();
    await prisma.user.deleteMany();
    await prisma.facility.deleteMany();
    await prisma.feedback.deleteMany();

    // Create Facilities
    const facilities = await prisma.facility.createManyAndReturn({
        data: [
            {
                name: 'Accra Central Hub',
                region: 'Greater Accra',
                status: 'Active',
                latitude: 5.6037,
                longitude: -0.1870,
            },
            {
                name: 'West Tema Plant',
                region: 'Eastern Coast',
                status: 'Active',
                latitude: 5.6698,
                longitude: -0.0169,
            },
            {
                name: 'Kumasi Hub',
                region: 'Ashanti Region',
                status: 'Active',
                latitude: 6.6961,
                longitude: -1.6151,
            },
        ],
    });

    const accraId = facilities.find(f => f.name === 'Accra Central Hub').id;
    const temaId = facilities.find(f => f.name === 'West Tema Plant').id;
    const kumasiId = facilities.find(f => f.name === 'Kumasi Hub').id;

    // Create Devices
    const devices = await prisma.device.createManyAndReturn({
        data: [
            {
                customBinId: 'BIN_001',
                location: 'North Sector Hub 04',
                fillLevel: 94,
                status: 'Active',
                deviceType: 'bin',
                lastSortedItem: 'Organic Waste',
                facilityId: accraId,
            },
            {
                customBinId: 'BIN_002',
                location: 'Downtown Plaza - East',
                fillLevel: 88,
                status: 'Active',
                deviceType: 'bin',
                lastSortedItem: 'Plastic Bottles',
                facilityId: accraId,
            },
            {
                customBinId: 'BIN_003',
                location: 'Industrial Park - West Entrance',
                fillLevel: 75,
                status: 'Active',
                deviceType: 'bin',
                lastSortedItem: 'Glass Bottles',
                facilityId: temaId,
            },
            {
                customBinId: 'BIN_004',
                location: 'Central Library Courtyard',
                fillLevel: 82,
                status: 'Maintenance',
                deviceType: 'bin',
                lastSortedItem: 'Mixed Waste',
                facilityId: accraId,
            },
            {
                customBinId: 'BIN_005',
                location: 'Riverside Apartments B3',
                fillLevel: 100,
                status: 'Full',
                deviceType: 'bin',
                lastSortedItem: 'Paper Waste',
                facilityId: kumasiId,
            },
            {
                customBinId: 'BIN_006',
                location: 'Metro Station South',
                fillLevel: 68,
                status: 'Active',
                deviceType: 'bin',
                lastSortedItem: 'Plastic Bottles',
                facilityId: temaId,
            },
            {
                customBinId: 'CON_001',
                location: 'Floor 2 North',
                fillLevel: 0,
                status: 'Active',
                deviceType: 'conveyor',
                lastSortedItem: 'Plastic Bottles',
                facilityId: accraId,
            },
            {
                customBinId: 'SEN_001',
                location: 'Outdoor Staging',
                fillLevel: 0,
                status: 'Active',
                deviceType: 'sensor',
                lastSortedItem: 'Mixed Waste',
                facilityId: temaId,
            },
            {
                customBinId: 'COM_001',
                location: 'Main Processing Room',
                fillLevel: 0,
                status: 'Active',
                deviceType: 'compactor',
                lastSortedItem: 'Organic Waste',
                facilityId: kumasiId,
            },
        ],
    });

    const deviceMap = Object.fromEntries(devices.map((device) => [device.customBinId, device]));

    // Create Collectors (Users with role COLLECTOR)
    await prisma.user.createMany({
        data: [
            {
                id: 'COL-001',
                name: 'Kwame Mensah',
                region: 'North Sector',
                status: 'Active',
                rating: 4.8,
                email: 'kwame.mensah@smartsort.com',
                role: 'COLLECTOR',
                facilityId: accraId,
            },
            {
                id: 'COL-002',
                name: 'Abena Osei',
                region: 'East Sector',
                status: 'Active',
                rating: 4.9,
                email: 'abena.osei@smartsort.com',
                role: 'COLLECTOR',
                facilityId: temaId,
            },
            {
                id: 'COL-003',
                name: 'Kofi Annan',
                region: 'South Sector',
                status: 'Inactive',
                rating: 4.5,
                email: 'kofi.annan@smartsort.com',
                role: 'COLLECTOR',
                facilityId: kumasiId,
            },
            {
                id: 'COL-004',
                name: 'Ama Asare',
                region: 'West Sector',
                status: 'Active',
                rating: 4.7,
                email: 'ama.asare@smartsort.com',
                role: 'COLLECTOR',
                facilityId: accraId,
            },
            {
                id: 'COL-005',
                name: 'Yaw Appiah',
                region: 'Central Hub',
                status: 'On Leave',
                rating: 4.6,
                email: 'yaw.appiah@smartsort.com',
                role: 'COLLECTOR',
                facilityId: temaId,
            },
            {
                id: 'COL-006',
                name: 'Esi Adjei',
                region: 'Northern Perimeter',
                status: 'Pending',
                rating: 4.4,
                email: 'esi.adjei@smartsort.com',
                role: 'COLLECTOR',
                facilityId: accraId,
            },
        ],
    });

    // Create Collection Jobs linked to Devices and Collectors
    const jobsData = [
        {
            status: 'Pending',
            priority: 'Urgent',
            deviceId: deviceMap.BIN_001.id,
            collectorId: 'COL-001',
        },
        {
            status: 'Pending',
            priority: 'High',
            deviceId: deviceMap.BIN_002.id,
            collectorId: 'COL-002',
        },
        {
            status: 'In Progress',
            priority: 'Normal',
            deviceId: deviceMap.BIN_003.id,
            collectorId: 'COL-003',
        },
        {
            status: 'In Progress',
            priority: 'Normal',
            deviceId: deviceMap.BIN_004.id,
            collectorId: 'COL-004',
        },
        {
            status: 'Completed',
            priority: 'Normal',
            deviceId: deviceMap.BIN_005.id,
            collectorId: 'COL-001',
        },
        {
            status: 'Completed',
            priority: 'High',
            deviceId: deviceMap.BIN_006.id,
            collectorId: 'COL-002',
        },
    ];

    // Add extra completed jobs for pagination
    for(let i = 0; i < 15; i++) {
        jobsData.push({
            status: 'Completed',
            priority: 'Normal',
            deviceId: deviceMap.BIN_001.id,
            collectorId: 'COL-001',
        });
    }

    await prisma.collectionJob.createMany({
        data: jobsData,
    });

    // Create Platform Users
    await prisma.user.createMany({
        data: [
            {
                id: 'USR-001',
                name: 'Alexander Vance',
                email: 'a.vance@smartsort.com',
                role: 'MANAGER',
                status: 'ACTIVE',
                assignedFacility: 'Accra Central Hub',
                avatar: null,
                facilityId: accraId,
            },
            {
                id: 'USR-002',
                name: 'Sarah Jenkins',
                email: 's.jenkins@smartsort.com',
                role: 'MANAGER',
                status: 'ACTIVE',
                assignedFacility: 'West Tema Plant',
                avatar: null,
                facilityId: temaId,
            },
            {
                id: 'USR-003',
                name: 'Marco Rossi',
                email: 'm.rossi@logistics.net',
                role: 'COLLECTOR',
                status: 'ACTIVE',
                assignedFacility: 'Kumasi Hub Logistics',
                avatar: null,
                facilityId: kumasiId,
            },
            {
                id: 'USR-004',
                name: 'Elena Rodriguez',
                email: 'e.rod@archive.org',
                role: 'VIEWER',
                status: 'SUSPENDED',
                assignedFacility: 'Global Read-Only',
                avatar: null,
            },
            {
                id: 'USR-005',
                name: 'Daniel Owusu',
                email: 'daniel.owusu@smartsort.com',
                role: 'MANAGER',
                status: 'PENDING',
                assignedFacility: 'Accra Central Hub',
                avatar: null,
                facilityId: accraId,
            },
            {
                id: 'USR-006',
                name: 'Nana Boateng',
                email: 'nana.boateng@smartsort.com',
                role: 'VIEWER',
                status: 'ACTIVE',
                assignedFacility: 'Central Operations',
                avatar: null,
            },
            {
                id: 'USR-007',
                name: 'Ghana Admin',
                email: 'admin@smartsort.com',
                role: 'ADMIN',
                status: 'ACTIVE',
                assignedFacility: 'All Facilities',
                avatar: null,
            },
        ],
    });

    // Create Bulk Collection Jobs (Third-Party Ghana Recyclers)
    await prisma.bulkCollectionJob.createMany({
        data: [
            {
                facilityId: accraId,
                status: 'Pending',
                tonnage: 4.5,
                collectorName: 'Zoomlion Ghana Limited',
            },
            {
                facilityId: temaId,
                status: 'Dispatched',
                tonnage: 3.2,
                collectorName: 'Coliba Ghana',
            },
            {
                facilityId: kumasiId,
                status: 'Completed',
                tonnage: 5.8,
                collectorName: 'Jekora Ventures',
                completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
        ]
    });

    // Create Community Feedback
    await prisma.feedback.createMany({
        data: [
            {
                message: 'Bin overflowed overnight and needs urgent pickup.',
                category: 'Missed Pickup',
            },
            {
                message: 'Lid is damaged and does not close properly.',
                category: 'Damaged Bin',
            },
            {
                message: 'Recycling bin was emptied late twice this week.',
                category: 'Late Collection',
            },
            {
                message: 'Requesting an additional bin near the loading bay.',
                category: 'New Bin Request',
            },
            {
                message: 'Collection missed after holiday schedule change.',
                category: 'Missed Pickup',
            },
        ],
    });

    // Create System Alerts linked to Devices
    const alertsData = [
        {
            deviceId: deviceMap.CON_001.id,
            severity: 'CRITICAL',
            title: 'Contamination Spike Detected',
            description: 'Non-recyclable high-density plastic in paper stream exceeds 15% threshold.',
            status: 'Active',
        },
        {
            deviceId: deviceMap.BIN_003.id,
            severity: 'WARNING',
            title: 'Fill Capacity Exceeded',
            description: 'Device reported 98% capacity. Pick-up scheduled for 18:00.',
            status: 'Active',
        },
        {
            deviceId: deviceMap.SEN_001.id,
            severity: 'WARNING',
            title: 'Battery Level Critical',
            description: 'Sensor battery at 4%. Shutdown imminent within 2 hours.',
            status: 'Active',
        },
        {
            deviceId: deviceMap.COM_001.id,
            severity: 'CRITICAL',
            title: 'Emergency Stop Engaged',
            description: 'Manual emergency stop triggered. System lockout active. Investigation required.',
            status: 'Active',
        },
    ];

    // Add extra alerts for pagination
    for(let i = 0; i < 15; i++) {
        alertsData.push({
            deviceId: deviceMap.BIN_002.id,
            severity: i % 2 === 0 ? 'WARNING' : 'INFO',
            title: `Routine System Notification ${i+1}`,
            description: `Auto-generated log for bin status check. Normal operation.`,
            status: 'Read',
        });
    }

    await prisma.alert.createMany({
        data: alertsData,
    });

    // Create ProcessedItem telemetry data for Hourly Throughput, Categories, and Contamination events
    const processedItemsData = [];
    const categories = ['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'Other'];
    const rejectionReasons = ['BIOHAZARD', 'MEDICAL_WASTE', 'E_WASTE', 'BATTERY_LITHIUM'];
    const actions = ['ROUTED_BIN_X', 'FLAG_OPERATOR', 'ROUTED_BIN_Y', 'E-STOP_TRIGGERED'];

    // Seed data that maps exactly to hourly throughput requirements
    const throughputPlan = [
        { hour: 8, sorted: 124, rejected: 18 },
        { hour: 9, sorted: 165, rejected: 24 },
        { hour: 10, sorted: 142, rejected: 15 },
        { hour: 11, sorted: 156, rejected: 22 },
        { hour: 12, sorted: 198, rejected: 34 },
        { hour: 13, sorted: 215, rejected: 28 },
        { hour: 14, sorted: 160, rejected: 19 },
        { hour: 15, sorted: 95, rejected: 12 },
    ];

    const baseDate = new Date();
    // Asset snapshot images corresponding to contamination events
    const contaminationImages = [
        'imgEventSnap',
        'imgEventSnap1',
        'imgEventSnap2',
        'imgEventSnap3'
    ];

    throughputPlan.forEach(({ hour, sorted, rejected }) => {
        // Seed Sorted items
        for (let i = 0; i < sorted; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const randomDevice = devices[Math.floor(Math.random() * devices.length)];
            const timestamp = new Date(baseDate);
            timestamp.setHours(hour, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));

            processedItemsData.push({
                deviceId: randomDevice.id,
                category,
                status: 'Sorted',
                confidence: parseFloat((85 + Math.random() * 14.9).toFixed(1)),
                actionTaken: 'AUTO_SORTED',
                createdAt: timestamp,
            });
        }

        // Seed Rejected (Contamination) items
        for (let i = 0; i < rejected; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const randomDevice = devices[Math.floor(Math.random() * devices.length)];
            const reason = rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)];
            const action = actions[Math.floor(Math.random() * actions.length)];
            const timestamp = new Date(baseDate);
            timestamp.setHours(hour, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
            const imageIndex = Math.floor(Math.random() * contaminationImages.length);

            processedItemsData.push({
                deviceId: randomDevice.id,
                category,
                status: 'Rejected',
                rejectionReason: reason,
                confidence: parseFloat((90 + Math.random() * 9.9).toFixed(1)),
                imageUrl: contaminationImages[imageIndex],
                actionTaken: action,
                createdAt: timestamp,
            });
        }
    });

    // Seed 5 weeks of historical data for analytics charts
    const weeksData = [
        { weeksAgo: 5, sorted: 250, rejected: 40 },
        { weeksAgo: 4, sorted: 350, rejected: 50 },
        { weeksAgo: 3, sorted: 500, rejected: 20 },
        { weeksAgo: 2, sorted: 550, rejected: 10 },
        { weeksAgo: 1, sorted: 650, rejected: 30 },
    ];
    
    weeksData.forEach(({ weeksAgo, sorted, rejected }) => {
        const pastDate = new Date(baseDate);
        pastDate.setDate(pastDate.getDate() - (weeksAgo * 7));
        
        for (let i = 0; i < sorted; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const randomDevice = devices[Math.floor(Math.random() * devices.length)];
            processedItemsData.push({
                deviceId: randomDevice.id,
                category,
                status: 'Sorted',
                confidence: 90,
                actionTaken: 'AUTO_SORTED',
                createdAt: pastDate,
            });
        }
        for (let i = 0; i < rejected; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const randomDevice = devices[Math.floor(Math.random() * devices.length)];
            processedItemsData.push({
                deviceId: randomDevice.id,
                category,
                status: 'Rejected',
                confidence: 90,
                actionTaken: 'FLAG_OPERATOR',
                createdAt: pastDate,
            });
        }
    });

    await prisma.processedItem.createMany({
        data: processedItemsData,
    });

    // Create System and Maintenance Events
    const deviceEventsData = [];
    const eventTypes = ['POWER_CYCLE', 'NETWORK_SYNC', 'SENSOR_UPDATE', 'MAINTENANCE', 'FIRMWARE_UPDATE'];
    const eventSeverities = ['INFO', 'WARNING', 'CRITICAL'];
    
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
        pastDate.setHours(pastDate.getHours() - Math.floor(Math.random() * 72)); // random time within last 72 hours

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

    console.log('Seeded mock data into Supabase successfully.');
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
