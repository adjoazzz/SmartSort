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
    await prisma.collectionJob.deleteMany();
    await prisma.device.deleteMany();
    await prisma.collector.deleteMany();
    await prisma.platformUser.deleteMany();
    await prisma.feedback.deleteMany();

    const devices = await prisma.device.createManyAndReturn({
        data: [
            {
                customBinId: 'BIN_001',
                location: 'North Sector Hub 04',
                fillLevel: 94,
                status: 'Active',
                lastSortedItem: 'Organic Waste',
            },
            {
                customBinId: 'BIN_002',
                location: 'Downtown Plaza - East',
                fillLevel: 88,
                status: 'Active',
                lastSortedItem: 'Plastic Bottles',
            },
            {
                customBinId: 'BIN_003',
                location: 'Industrial Park - West Entrance',
                fillLevel: 75,
                status: 'Active',
                lastSortedItem: 'Glass Bottles',
            },
            {
                customBinId: 'BIN_004',
                location: 'Central Library Courtyard',
                fillLevel: 82,
                status: 'Maintenance',
                lastSortedItem: 'Mixed Waste',
            },
            {
                customBinId: 'BIN_005',
                location: 'Riverside Apartments B3',
                fillLevel: 100,
                status: 'Full',
                lastSortedItem: 'Paper Waste',
            },
            {
                customBinId: 'BIN_006',
                location: 'Metro Station South',
                fillLevel: 68,
                status: 'Active',
                lastSortedItem: 'Plastic Bottles',
            },
        ],
    });

    const deviceByBinId = Object.fromEntries(devices.map((device) => [device.customBinId, device]));

    await prisma.collectionJob.createMany({
        data: [
            {
                status: 'Pending',
                priority: 'Urgent',
                deviceId: deviceByBinId.BIN_001.id,
                collectorId: 'COL-001',
            },
            {
                status: 'Pending',
                priority: 'High',
                deviceId: deviceByBinId.BIN_002.id,
                collectorId: 'COL-002',
            },
            {
                status: 'In Progress',
                priority: 'Normal',
                deviceId: deviceByBinId.BIN_003.id,
                collectorId: 'COL-003',
            },
            {
                status: 'In Progress',
                priority: 'Normal',
                deviceId: deviceByBinId.BIN_004.id,
                collectorId: 'COL-004',
            },
            {
                status: 'Completed',
                priority: 'Normal',
                deviceId: deviceByBinId.BIN_005.id,
                collectorId: 'COL-001',
            },
            {
                status: 'Completed',
                priority: 'High',
                deviceId: deviceByBinId.BIN_006.id,
                collectorId: 'COL-002',
            },
        ],
    });

    await prisma.collector.createMany({
        data: [
            {
                collectorId: 'COL-001',
                name: 'Kwame Mensah',
                region: 'North Sector',
                status: 'Active',
                rating: 4.8,
                email: 'kwame.mensah@smartsort.com',
            },
            {
                collectorId: 'COL-002',
                name: 'Abena Osei',
                region: 'East Sector',
                status: 'Active',
                rating: 4.9,
                email: 'abena.osei@smartsort.com',
            },
            {
                collectorId: 'COL-003',
                name: 'Kofi Annan',
                region: 'South Sector',
                status: 'Inactive',
                rating: 4.5,
                email: 'kofi.annan@smartsort.com',
            },
            {
                collectorId: 'COL-004',
                name: 'Ama Asare',
                region: 'West Sector',
                status: 'Active',
                rating: 4.7,
                email: 'ama.asare@smartsort.com',
            },
            {
                collectorId: 'COL-005',
                name: 'Yaw Appiah',
                region: 'Central Hub',
                status: 'On Leave',
                rating: 4.6,
                email: 'yaw.appiah@smartsort.com',
            },
            {
                collectorId: 'COL-006',
                name: 'Esi Adjei',
                region: 'Northern Perimeter',
                status: 'Pending',
                rating: 4.4,
                email: 'esi.adjei@smartsort.com',
            },
        ],
    });

    await prisma.platformUser.createMany({
        data: [
            {
                userId: 'USR-001',
                name: 'Alexander Vance',
                email: 'a.vance@smartsort.com',
                role: 'Admin',
                status: 'ACTIVE',
                assignedFacility: 'HQ Corporate Center',
                avatar: null,
            },
            {
                userId: 'USR-002',
                name: 'Sarah Jenkins',
                email: 's.jenkins@smartsort.com',
                role: 'Manager',
                status: 'ACTIVE',
                assignedFacility: 'East Side Recycling',
                avatar: null,
            },
            {
                userId: 'USR-003',
                name: 'Marco Rossi',
                email: 'm.rossi@logistics.net',
                role: 'Collector',
                status: 'ACTIVE',
                assignedFacility: 'South Hub Logistics',
                avatar: null,
            },
            {
                userId: 'USR-004',
                name: 'Elena Rodriguez',
                email: 'e.rod@archive.org',
                role: 'Viewer',
                status: 'SUSPENDED',
                assignedFacility: 'Global Read-Only',
                avatar: null,
            },
            {
                userId: 'USR-005',
                name: 'Daniel Owusu',
                email: 'daniel.owusu@smartsort.com',
                role: 'Operator',
                status: 'PENDING',
                assignedFacility: 'North Sector Hub',
                avatar: null,
            },
            {
                userId: 'USR-006',
                name: 'Nana Boateng',
                email: 'nana.boateng@smartsort.com',
                role: 'Viewer',
                status: 'ACTIVE',
                assignedFacility: 'Central Operations',
                avatar: null,
            },
        ],
    });

    await prisma.feedback.createMany({
        data: [
            {
                userName: 'Joana Mensah',
                location: 'North Sector Hub 04',
                message: 'Bin overflowed overnight and needs urgent pickup.',
                category: 'Missed Pickup',
                status: 'Pending',
            },
            {
                userName: 'Eric Tetteh',
                location: 'Downtown Plaza - East',
                message: 'Lid is damaged and does not close properly.',
                category: 'Damaged Bin',
                status: 'In Progress',
            },
            {
                userName: 'Grace Akoto',
                location: 'Industrial Park - West Entrance',
                message: 'Recycling bin was emptied late twice this week.',
                category: 'Late Collection',
                status: 'Resolved',
            },
            {
                userName: 'Samuel Koomson',
                location: 'Central Library Courtyard',
                message: 'Requesting an additional bin near the loading bay.',
                category: 'New Bin Request',
                status: 'Pending',
            },
            {
                userName: 'Miriam Danso',
                location: 'Riverside Apartments B3',
                message: 'Collection missed after holiday schedule change.',
                category: 'Missed Pickup',
                status: 'In Progress',
            },
        ],
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
