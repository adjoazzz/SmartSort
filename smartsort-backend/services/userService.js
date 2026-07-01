const { prisma } = require('../lib/prisma');
const AppError = require('../utils/errorHandler');

class UserService {
  async getUsers(facilityId) {
    const where = facilityId ? { facilityId } : {};
    return prisma.user.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getCollectors(facilityId, search = '', page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const whereClause = {
      role: 'COLLECTOR',
      ...(facilityId ? { facilityId } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { region: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [collectors, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    return { collectors, totalCount };
  }

  async syncAuthUser(id, email, name, role) {
    if (!id || !email) {
      throw new AppError('id and email are required for sync', 400, 'VALIDATION_FAILED');
    }
    return prisma.user.upsert({
      where: { email },
      update: { authId: id, name: name || 'Unknown', role: role || 'MANAGER' },
      create: { id, authId: id, email, name: name || 'Unknown', role: role || 'MANAGER' }
    });
  }

  async createUser(actorName, data) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new AppError('Email already in use', 409, 'CONFLICT');
    }

    const created = await prisma.user.create({
      data,
    });

    await prisma.auditLog.create({
      data: {
        action: "New User Invited",
        actorName: actorName || "System",
        details: `${actorName || "System"} invited ${created.name} as ${created.role}.`,
        color: "text-[#006c49]",
      },
    });

    return created;
  }

  async updateUser(id, actorName, data) {
    const originalUser = await prisma.user.findUnique({ where: { id } });
    if (!originalUser) {
      throw new AppError('User not found', 404, 'NOT_FOUND');
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    if (data.role !== undefined && data.role !== originalUser.role) {
      await prisma.auditLog.create({
        data: {
          action: "User Role Updated",
          actorName: actorName || "System",
          details: `${actorName || "System"} changed ${updated.name}'s role from ${originalUser.role} to ${data.role}.`,
          color: "text-foreground dark:text-white"
        }
      });
    }

    if (data.status !== undefined && data.status !== originalUser.status && 
        (data.status === 'SUSPENDED' || data.status === 'Suspended' || data.status === 'Inactive')) {
      await prisma.auditLog.create({
        data: {
          action: "User Removed",
          actorName: actorName || "System",
          details: `${actorName || "System"} suspended user ${updated.name}.`,
          color: "text-[#ba1a1a]"
        }
      });
    }

    return updated;
  }

  async createCollector(data) {
    return prisma.user.create({
      data: {
        ...data,
        role: 'COLLECTOR',
      },
    });
  }

  async updateCollector(id, data) {
    const originalUser = await prisma.user.findUnique({ where: { id } });
    if (!originalUser) {
      throw new AppError('Collector not found', 404, 'NOT_FOUND');
    }
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}

module.exports = new UserService();
