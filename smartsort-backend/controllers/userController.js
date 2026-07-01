const userService = require('../services/userService');
const AppError = require('../utils/errorHandler');

class UserController {
  async getUsers(req, res, next) {
    try {
      const facilityId = req.query.facilityId;
      const users = await userService.getUsers(facilityId);
      res.status(200).json(users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email ?? null,
        role: u.role ?? null,
        status: u.status,
        rating: u.rating ?? 0,
        avatar: u.avatar ?? null,
        assignedFacility: u.assignedFacility ?? null,
        region: u.region ?? null,
        authId: u.authId ?? null,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      })));
    } catch (err) {
      next(err);
    }
  }

  async getCollectors(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';
      const facilityId = req.query.facilityId;

      const { collectors, totalCount } = await userService.getCollectors(facilityId, search, page, limit);

      res.status(200).json({
        data: collectors.map(c => ({
          id: c.id,
          name: c.name,
          email: c.email ?? null,
          role: c.role ?? null,
          status: c.status,
          rating: c.rating ?? 0,
          avatar: c.avatar ?? null,
          assignedFacility: c.assignedFacility ?? null,
          region: c.region ?? null,
          authId: c.authId ?? null,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        })),
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      });
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      let { name, email, role, status, assignedFacility, avatar, facilityId } = req.body;

      if (req.user.role === 'MANAGER') {
        facilityId = req.user.facilityId;
        assignedFacility = req.user.assignedFacility;
      }

      const actorName = req.user?.name || "System";
      const createdUser = await userService.createUser(actorName, {
        name,
        email,
        role,
        status: status || 'PENDING',
        assignedFacility: assignedFacility || 'Unassigned',
        facilityId: facilityId || null,
        avatar: avatar || null,
      });

      res.status(201).json(createdUser);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, role, status, assignedFacility, avatar } = req.body;

      if (req.user.role === 'MANAGER') {
        const originalUser = await userService.updateUser(id, req.user?.name, {});
        if (originalUser.facilityId !== req.user.facilityId) {
          throw new AppError('Forbidden: You can only manage users in your facility', 403, 'FORBIDDEN');
        }
        if (assignedFacility !== undefined && assignedFacility !== req.user.assignedFacility) {
          throw new AppError('Forbidden: Managers cannot change user facility assignments', 403, 'FORBIDDEN');
        }
      }

      const actorName = req.user?.name || "System";
      const updatedUser = await userService.updateUser(id, actorName, {
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(role !== undefined ? { role } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(assignedFacility !== undefined ? { assignedFacility } : {}),
        ...(avatar !== undefined ? { avatar: avatar || null } : {}),
      });

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  async createCollector(req, res, next) {
    try {
      const { name, email, region, status, rating } = req.body;

      if (!name || !region) {
        throw new AppError('Name and region are required', 400, 'VALIDATION_FAILED');
      }

      const createdCollector = await userService.createCollector({
        name,
        email: email || null,
        region,
        status: status || 'Pending',
        rating: Number(rating) || 0,
      });

      res.status(201).json(createdCollector);
    } catch (err) {
      next(err);
    }
  }

  async updateCollector(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, region, status, rating } = req.body;

      const updatedCollector = await userService.updateCollector(id, {
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email: email || null } : {}),
        ...(region !== undefined ? { region } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(rating !== undefined ? { rating: Number(rating) || 0 } : {}),
      });

      res.status(200).json(updatedCollector);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
