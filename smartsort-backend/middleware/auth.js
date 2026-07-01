const { createClient } = require('@supabase/supabase-js');
const { prisma } = require('../lib/prisma');
const AppError = require('../utils/errorHandler');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError('Authentication token required', 401, 'UNAUTHORIZED'));
  }

  try {
    const { data: { user: supabaseUser }, error } = await supabase.auth.getUser(token);
    
    if (error || !supabaseUser || !supabaseUser.email) {
      return next(new AppError('Invalid or expired authentication token', 401, 'UNAUTHORIZED'));
    }

    let user = await prisma.user.findUnique({
      where: { email: supabaseUser.email },
    });

    if (!user) {
      const role = supabaseUser.email.toLowerCase().includes('admin') ? 'ADMIN' : 'MANAGER';
      user = await prisma.user.create({
        data: {
          id: supabaseUser.id,
          authId: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.email.split('@')[0],
          role: role,
          status: 'ACTIVE',
        },
      });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    next(new AppError('Forbidden: Admin access required', 403, 'FORBIDDEN'));
  }
};

const requireManagerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'ADMIN' || req.user.role === 'MANAGER')) {
    next();
  } else {
    next(new AppError('Forbidden: Manager or Admin access required', 403, 'FORBIDDEN'));
  }
};

const restrictToFacility = (req, res, next) => {
  if (req.user && req.user.role === 'MANAGER') {
    req.query.facilityId = req.user.facilityId || req.user.assignedFacility;
  }
  next();
};

module.exports = {
  requireAuth,
  requireAdmin,
  requireManagerOrAdmin,
  restrictToFacility,
  supabase,
};
