const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const { prisma } = require('../lib/prisma');
const AppError = require('../utils/errorHandler');
const logger = require('../utils/logger');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// In-memory cache for validated tokens: tokenHash -> { user, expiresAt }
const tokenCache = new Map();

// In-flight deduplication: tokenHash -> Promise<user>
const inFlightVerifications = new Map();

// Periodic cache cleanup every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [hash, entry] of tokenCache.entries()) {
    if (entry.expiresAt <= now) {
      tokenCache.delete(hash);
    }
  }
}, 5 * 60 * 1000).unref();

/**
 * Safely decodes the payload of a JWT without verifying the signature.
 */
function decodeJwtPayload(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}

/**
 * Determines whether an error is a transient network or timeout error.
 */
function isNetworkError(err) {
  if (!err) return false;
  if (err.name === 'AuthRetryableFetchError') return true;
  if (err.status === 0) return true;
  if (err.code === 'UND_ERR_CONNECT_TIMEOUT' || err.cause?.code === 'UND_ERR_CONNECT_TIMEOUT') return true;
  const msg = (err.message || '').toLowerCase();
  return (
    msg.includes('fetch failed') ||
    msg.includes('connect timeout') ||
    msg.includes('network error') ||
    msg.includes('socket hang up') ||
    msg.includes('econnrefused') ||
    msg.includes('etimedout')
  );
}

/**
 * Calls Supabase auth.getUser with a strict timeout and 1 retry on network timeout.
 */
async function verifyWithSupabase(token) {
  const timeoutMs = 7000;

  const attempt = async () => {
    let timer;
    const timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => {
        const timeoutErr = new Error('Supabase auth.getUser request timed out');
        timeoutErr.name = 'TimeoutError';
        timeoutErr.status = 0;
        reject(timeoutErr);
      }, timeoutMs);
    });

    try {
      const response = await Promise.race([
        supabase.auth.getUser(token),
        timeoutPromise,
      ]);
      return response;
    } finally {
      clearTimeout(timer);
    }
  };

  try {
    return await attempt();
  } catch (err) {
    if (isNetworkError(err)) {
      // 1 quick retry after 200ms
      await new Promise((r) => setTimeout(r, 200));
      try {
        return await attempt();
      } catch (retryErr) {
        return { data: { user: null }, error: retryErr };
      }
    }
    return { data: { user: null }, error: err };
  }
}

/**
 * Resolves or creates a database user for an authenticated Supabase user.
 */
async function getOrCreateDbUser(supabaseUser) {
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

  return user;
}

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError('Authentication token required', 401, 'UNAUTHORIZED'));
  }

  // Pre-validate token structure and expiration
  const payload = decodeJwtPayload(token);
  if (!payload || !payload.exp) {
    return next(new AppError('Invalid authentication token format', 401, 'UNAUTHORIZED'));
  }

  const nowMs = Date.now();
  if (payload.exp * 1000 <= nowMs) {
    return next(new AppError('Authentication token has expired', 401, 'UNAUTHORIZED'));
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  // Check in-memory cache
  const cached = tokenCache.get(tokenHash);
  if (cached && cached.expiresAt > nowMs) {
    req.user = cached.user;
    return next();
  }

  // Deduplicate concurrent verification requests for the same token
  let verificationPromise = inFlightVerifications.get(tokenHash);
  if (!verificationPromise) {
    verificationPromise = (async () => {
      const { data, error } = await verifyWithSupabase(token);
      const supabaseUser = data?.user;

      if (!error && supabaseUser && supabaseUser.email) {
        const dbUser = await getOrCreateDbUser(supabaseUser);
        // Cache for 5 minutes or until token expiration, whichever is earlier
        const cacheTtlMs = Math.min(5 * 60 * 1000, payload.exp * 1000 - nowMs);
        if (cacheTtlMs > 0) {
          tokenCache.set(tokenHash, {
            user: dbUser,
            expiresAt: Date.now() + cacheTtlMs,
          });
        }
        return dbUser;
      }

      // Check if this was a network failure versus actual auth invalidation
      if (isNetworkError(error)) {
        logger.warn('Supabase Auth network timeout/error encountered in requireAuth', {
          error: error.message || error,
          email: payload.email,
        });

        // Graceful fallback: If JWT payload is valid & unexpired, check if user exists in local database
        if (payload.email) {
          const existingUser = await prisma.user.findUnique({
            where: { email: payload.email },
          });

          if (existingUser) {
            logger.info('Proceeding with verified DB user record during Supabase Auth network outage', {
              userId: existingUser.id,
              email: existingUser.email,
            });
            // Cache briefly (60s) while upstream connectivity recovers
            tokenCache.set(tokenHash, {
              user: existingUser,
              expiresAt: Date.now() + 60 * 1000,
            });
            return existingUser;
          }
        }

        // Return 503 instead of 401 so the frontend does not inappropriately clear user session
        throw new AppError('Authentication service temporarily unreachable - please try again', 503, 'SERVICE_UNAVAILABLE');
      }

      // Supabase returned a genuine rejection (e.g. 401, 403, revoked session)
      logger.error('Supabase auth rejection in backend:', {
        error: error?.message || error,
        status: error?.status,
        email: payload.email,
      });
      throw new AppError('Invalid or expired authentication token', 401, 'UNAUTHORIZED');
    })().finally(() => {
      inFlightVerifications.delete(tokenHash);
    });

    inFlightVerifications.set(tokenHash, verificationPromise);
  }

  try {
    const user = await verificationPromise;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'ADMIN' || req.user.email?.toLowerCase().includes('admin'))) {
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
