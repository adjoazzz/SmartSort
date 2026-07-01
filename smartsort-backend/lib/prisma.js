const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const logger = require('../utils/logger');

const databaseUrl = process.env.DATABASE_URL;
const isSupabaseDatabase = /supabase\.com/i.test(databaseUrl || '');

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: isSupabaseDatabase ? { rejectUnauthorized: false } : undefined,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
  log: [
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

prisma.$on('warn', (e) => {
  logger.warn(`Prisma Warning: ${e.message}`);
});

prisma.$on('error', (e) => {
  logger.error(`Prisma Error: ${e.message}`);
});

module.exports = { prisma, pool };
