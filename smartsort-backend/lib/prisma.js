const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const logger = require('../utils/logger');

const databaseUrl = process.env.DATABASE_URL;
const isSupabaseDatabase = /supabase\.com/i.test(databaseUrl || '');

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: isSupabaseDatabase ? { rejectUnauthorized: false } : undefined,
  max: 5, // Limit connections to prevent reaching the 15 session limit
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
  log: [
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

// Graceful shutdown to prevent connection leaks on nodemon restarts
process.once('SIGUSR2', async () => {
  await prisma.$disconnect();
  await pool.end();
  process.kill(process.pid, 'SIGUSR2');
});
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  await pool.end();
  process.exit(0);
});

prisma.$on('warn', (e) => {
  logger.warn(`Prisma Warning: ${e.message}`);
});

prisma.$on('error', (e) => {
  logger.error(`Prisma Error: ${e.message}`);
});

module.exports = { prisma, pool };
