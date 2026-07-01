const { prisma } = require('../lib/prisma');

class AuditService {
  async getAuditLogs(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          action: true,
          actorName: true,
          details: true,
          color: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.auditLog.count(),
    ]);

    return { logs, total };
  }

  async createAuditLog(data) {
    return prisma.auditLog.create({
      data: {
        action: data.action || 'Security Alert',
        actorName: data.actorName || 'System',
        details: data.details || '',
        color: data.color || 'text-foreground',
      },
    });
  }
}

module.exports = new AuditService();
