# SmartSort Project Improvement PRD
**Version:** 1.0  
**Date:** 2026-07-01  
**Status:** In Progress  

---

## Executive Summary

This PRD outlines a comprehensive roadmap to address critical security vulnerabilities, architectural deficiencies, and code quality issues in the SmartSort waste management platform. Implementation is organized in 9 phases over 4 weeks, prioritizing security and stability first.

**Key Deliverables:**
- Security hardening (remove auth bypasses, add validation, rate limiting)
- Unified error handling and logging
- Backend architecture refactoring (monolithic → modular)
- Frontend type safety improvements
- Database optimization
- ML model robustness
- Testing infrastructure
- CI/CD and monitoring
- Documentation

---

## Phase 1: Critical Security & Stability Fixes ⚠️

### 1.1 Remove Mock Auth Bypass

**Priority:** CRITICAL  
**Effort:** 2-3 hours  
**Files Affected:** `smartsort-backend/server.js`

**Current Issue:**
- Mock auth header (`x-mock-role`) allows unauthorized access bypass
- Line ~40-50: Mock admin creation without token validation
- Production risk: Any client can impersonate any role

**Requirements:**
1. Remove `x-mock-role` header logic from `requireAuth` middleware
2. Require valid JWT from Supabase for all API calls
3. Return `401 Unauthorized` if no token provided
4. Create test token generation utility for development
5. Update development documentation with test token process

**Success Criteria:**
- ✓ No requests accepted without valid JWT
- ✓ Mock role header is ignored/rejected
- ✓ All tests pass with valid tokens
- ✓ Local development works without auth bypass

---

### 1.2 Implement Request Validation Middleware

**Priority:** CRITICAL  
**Effort:** 4-6 hours  
**Dependencies:** Phase 1.1  
**Packages:** `zod@^3.0.0` or `joi@^17.0.0`

**Requirements:**
1. Create `smartsort-backend/middleware/validation.js`
2. Define schemas for all endpoint inputs:
   - User creation/update (name, email, role, status)
   - Device registration (customBinId, location, deviceType, facilityId)
   - Job creation/update (status, location, tonnage)
   - Audit log creation (action, actorName, details)
3. Add validation to high-risk endpoints:
   - POST `/api/users`
   - PATCH `/api/users/:id`
   - POST `/api/devices`
   - POST `/api/jobs`
   - PATCH `/api/jobs/:id`
4. Return standardized 400 response with field-level errors

**Example Schema (Zod):**
```typescript
const updateUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'MANAGER', 'COLLECTOR']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']).optional(),
  avatar: z.string().url().nullable().optional(),
});
```

**Response Format:**
```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Request validation failed",
    "fields": {
      "email": "Invalid email format",
      "role": "Invalid role value"
    }
  },
  "status": 400
}
```

**Success Criteria:**
- ✓ All POST/PATCH endpoints validate input
- ✓ Invalid requests return 400 with clear field errors
- ✓ No SQL injection possible via string inputs
- ✓ Schema definitions centralized and reusable

---

### 1.3 Add Rate Limiting

**Priority:** CRITICAL  
**Effort:** 3-4 hours  
**Packages:** `express-rate-limit@^7.0.0`

**Requirements:**
1. Create `smartsort-backend/middleware/rateLimit.js`
2. Implement multiple rate limit tiers:
   - **Login endpoint**: 5 requests per 15 minutes (per IP)
   - **API endpoints**: 100 requests per 15 minutes (per user)
   - **Bulk operations**: 10 requests per 15 minutes (per user)
   - **Webhook endpoints**: 1000 requests per hour (per IP)
3. Store rate limit state (in-memory for dev, Redis for production)
4. Return 429 with retry-after header when limit exceeded

**Configuration Example:**
```javascript
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many login attempts, please try again later',
  statusCode: 429,
  skip: (req) => req.user?.role === 'ADMIN', // Admins exempt
});
```

**Success Criteria:**
- ✓ Login endpoint limited to 5 attempts/15 min
- ✓ API endpoints limited to 100 requests/15 min per user
- ✓ 429 responses include `Retry-After` header
- ✓ Rate limits don't apply to health checks

---

### 1.4 Secure Environment Variables

**Priority:** HIGH  
**Effort:** 2-3 hours

**Requirements:**
1. Create `.env.example` files (all 3 projects):
   - `smartsort-backend/.env.example`
   - `.env.example` (frontend root)
   - `smartsort-ml/.env.example`
2. Move all hardcoded URLs to environment variables:
   - `VITE_API_BASE_URL` (frontend)
   - `DATABASE_URL` (backend)
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY` (both)
   - `ML_API_URL` (frontend)
   - `NODE_ENV` (backend)
3. Update `vite.config.ts` to use `import.meta.env`
4. Add startup validation in `server.js`:
   - Check all required vars exist
   - Exit with error if missing
5. Remove sensitive vars from git (add to `.gitignore`)

**Example .env.example:**
```bash
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/smartsort
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=xxxxxxxxxx
NODE_ENV=development
PORT=5000

# Frontend  
VITE_API_BASE_URL=http://localhost:5000
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxxxxxxx

# ML
ML_MODEL_PATH=./smart_bin_model.tflite
ML_PORT=5001
```

**Success Criteria:**
- ✓ No hardcoded URLs in code
- ✓ All required vars documented in .example files
- ✓ App fails fast if vars missing
- ✓ `.env` files not in git

---

## Phase 2: Error Handling & Logging 📊

### 2.1 Create Unified Error Handler

**Priority:** HIGH  
**Effort:** 3-4 hours  
**Dependencies:** Phase 1

**Requirements:**
1. Create `smartsort-backend/utils/errorHandler.js`
2. Define custom error class:
   ```javascript
   class AppError extends Error {
     constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
       super(message);
       this.statusCode = statusCode;
       this.code = code;
       this.timestamp = new Date();
     }
   }
   ```
3. Create global error middleware:
   - Catches all uncaught exceptions
   - Formats to standard response
   - Logs error with context
   - Never exposes stack traces to client
4. Add to end of `server.js` before app listen

**Standard Error Response:**
```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User with ID 123 does not exist",
    "requestId": "req-12345-abc",
    "timestamp": "2026-07-01T10:30:00Z"
  },
  "status": 404
}
```

**Error Code Registry:**
- `VALIDATION_FAILED` (400)
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `CONFLICT` (409)
- `RATE_LIMITED` (429)
- `DB_ERROR` (500)
- `INTERNAL_ERROR` (500)

**Success Criteria:**
- ✓ All errors return standardized format
- ✓ No stack traces in production responses
- ✓ All endpoints wrapped in try-catch
- ✓ Request IDs included for tracing

---

### 2.2 Implement Structured Logging

**Priority:** HIGH  
**Effort:** 4-5 hours  
**Packages:** `winston@^3.0.0` or `pino@^8.0.0`

**Requirements:**
1. Create `smartsort-backend/utils/logger.js`
2. Configure logger with levels:
   - `error` - Application errors
   - `warn` - Warnings (resource limits, unusual behavior)
   - `info` - Important events (login, job completion)
   - `debug` - Detailed debug info
3. Log all API requests:
   - Timestamp, method, endpoint, query params
   - User ID, response time, status code
   - Request/response size
4. Log database operations:
   - Errors only (not every query)
   - Operation type, table, duration
5. Log authentication events:
   - Login attempts (success and failure)
   - Token refresh
   - Permission errors
6. Exclude sensitive data:
   - Passwords, tokens, API keys
   - Personal details (mask emails, phone)
7. Write logs to `logs/` directory:
   - Daily rotation
   - Max 30 days retention

**Logger Usage:**
```javascript
logger.info('User logged in', {
  userId: user.id,
  email: user.email,
  ip: req.ip,
  userAgent: req.get('user-agent'),
});

logger.error('Database error', {
  code: err.code,
  query: 'UPDATE users SET...',
  duration: 1234,
});
```

**Success Criteria:**
- ✓ All API requests logged
- ✓ All errors logged with context
- ✓ No sensitive data in logs
- ✓ Logs can be queried/analyzed
- ✓ Daily log rotation working

---

### 2.3 Add Error Boundaries (Frontend)

**Priority:** MEDIUM  
**Effort:** 2-3 hours

**Requirements:**
1. Create `src/components/ErrorBoundary.tsx`
2. Catch React render errors
3. Display user-friendly error page:
   - Error title
   - Retry button
   - Contact support link
4. Log errors to console and backend
5. Wrap main app in error boundary

**Component Structure:**
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
```

**Success Criteria:**
- ✓ App doesn't crash on component errors
- ✓ User sees helpful error message
- ✓ Errors logged for debugging
- ✓ Retry functionality works

---

### 2.4 Standardize API Error Responses

**Priority:** HIGH  
**Effort:** 6-8 hours  
**Dependencies:** Phase 2.1

**Requirements:**
1. Update all endpoints in `smartsort-backend/server.js`:
   - Replace ad-hoc error responses
   - Use standardized error format
   - Include error codes
2. Audit error cases:
   - Missing resources (404)
   - Permission errors (403)
   - Validation failures (400)
   - Database errors (500)
3. Add request ID to every response:
   - Generated in middleware
   - Included in logs
   - Returned to client
4. Test all error paths:
   - Invalid input
   - Missing auth
   - Resource not found
   - Database down

**Before/After Example:**

Before:
```javascript
res.status(500).json({ error: 'Failed to update user' });
```

After:
```javascript
throw new AppError('User not found', 404, 'USER_NOT_FOUND');
```

**Success Criteria:**
- ✓ All errors use standardized format
- ✓ Error codes consistent across app
- ✓ Request IDs enable request tracing
- ✓ Client can programmatically handle errors

---

## Phase 3: Backend Architecture Refactoring 🏗️

### 3.1 Split Monolithic server.js

**Priority:** HIGH  
**Effort:** 8-10 hours  
**Dependencies:** Phase 1, Phase 2

**Current State:**
- `server.js`: 1000+ lines
- All routes, controllers, middleware mixed
- Hard to test, maintain, extend

**Target Structure:**
```
smartsort-backend/
├── server.js (50 lines - setup only)
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   ├── errorHandler.js
│   ├── rateLimit.js
│   └── requestId.js
├── routes/
│   ├── index.js
│   ├── auth.js
│   ├── users.js
│   ├── devices.js
│   ├── alerts.js
│   ├── jobs.js
│   ├── dashboard.js
│   └── auditLogs.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── deviceController.js
│   ├── alertController.js
│   ├── jobController.js
│   ├── dashboardController.js
│   └── auditLogController.js
├── services/
│   ├── userService.js
│   ├── deviceService.js
│   ├── jobService.js
│   └── auditService.js
├── utils/
│   ├── logger.js
│   ├── errorHandler.js
│   ├── validators.js
│   └── helpers.js
└── tests/
    ├── services/
    ├── controllers/
    └── integration/
```

**Route File Example:**
```javascript
// routes/users.js
const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const { updateUser, deleteUser } = require('../controllers/userController');
const { validateUpdateUser } = require('../middleware/validation');

router.patch('/:id', requireAdmin, validateUpdateUser, updateUser);
router.delete('/:id', requireAdmin, deleteUser);

module.exports = router;
```

**Main server.js After Refactoring:**
```javascript
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const { requestId } = require('./middleware/requestId');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(requestId);
app.use('/api', routes);
app.use(errorHandler);

app.listen(process.env.PORT || 5000);
```

**Requirements:**
1. Extract each route group to separate file in `routes/`
2. Create controllers for business logic in `controllers/`
3. Move all Prisma queries to services in `services/`
4. Keep middleware in `middleware/`
5. Create `routes/index.js` to mount all routes
6. Ensure backward compatibility - all endpoints work same as before
7. Add JSDoc to all functions

**Success Criteria:**
- ✓ `server.js` < 100 lines
- ✓ Each route file < 300 lines
- ✓ Controllers delegate to services
- ✓ Services handle Prisma queries
- ✓ All endpoints work identically to before
- ✓ No circular dependencies
- ✓ Easier to test and extend

---

### 3.2 Add Input Validation Layer

**Priority:** HIGH  
**Effort:** 5-6 hours  
**Dependencies:** Phase 1.2

**Requirements:**
1. Create `smartsort-backend/utils/validators.js`
2. Define schemas for all request types:
   - User CRUD operations
   - Device registration/updates
   - Job creation/updates
   - Alert operations
3. Use Zod for type-safe validation
4. Create validation middleware factory:
   ```javascript
   const validate = (schema) => (req, res, next) => {
     const result = schema.safeParse(req.body);
     if (!result.success) {
       return res.status(400).json({
         error: { code: 'VALIDATION_FAILED', fields: result.error.flatten().fieldErrors }
       });
     }
     req.validatedData = result.data;
     next();
   };
   ```
5. Apply to all routes with data mutations

**Schema Organization:**
```javascript
// validators.js
export const schemas = {
  user: {
    create: z.object({...}),
    update: z.object({...}),
  },
  device: {
    create: z.object({...}),
    update: z.object({...}),
  },
  // ...
};
```

**Usage in Routes:**
```javascript
router.post('/users', validate(schemas.user.create), createUser);
```

**Success Criteria:**
- ✓ All input validated before processing
- ✓ Clear validation error messages
- ✓ Type definitions auto-generated from schemas
- ✓ Easy to maintain and extend

---

### 3.3 Create Service Layer

**Priority:** HIGH  
**Effort:** 8-10 hours  
**Dependencies:** Phase 3.1, Phase 3.2

**Requirements:**
1. Create `smartsort-backend/services/` with:
   - `userService.js` - User CRUD, role management, permissions
   - `deviceService.js` - Device operations, facility associations
   - `jobService.js` - Job scheduling, status updates, routing
   - `auditService.js` - Audit log creation
   - `alertService.js` - Alert creation, severity calculation
2. Move all Prisma queries from routes to services
3. Services handle:
   - Business logic (calculations, status transitions)
   - Database queries
   - Error handling specific to domain
   - Input validation (secondary check)
4. Services are tested independently

**Service Example:**
```javascript
// userService.js
class UserService {
  async createUser(data) {
    // Validate unique email
    const existing = await prisma.user.findUnique({
      where: { email: data.email }
    });
    if (existing) {
      throw new AppError('Email already in use', 409, 'EMAIL_EXISTS');
    }
    
    return prisma.user.create({ data });
  }
  
  async updateUserRole(userId, newRole) {
    const user = await this.getUserById(userId);
    
    // Audit log
    await auditService.log('User Role Updated', {
      userId,
      from: user.role,
      to: newRole,
    });
    
    return prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    });
  }
}

module.exports = new UserService();
```

**Controller Using Service:**
```javascript
// controllers/userController.js
async function updateUser(req, res, next) {
  try {
    const user = await userService.updateUserRole(req.params.id, req.body.role);
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
}
```

**Success Criteria:**
- ✓ All business logic in services
- ✓ Controllers thin (< 20 lines each)
- ✓ Services testable in isolation
- ✓ No Prisma queries in controllers/routes
- ✓ Easy to add new features

---

## Phase 4: Frontend Type Safety & Code Organization 🎨

### 4.1 Remove `any` Types

**Priority:** HIGH  
**Effort:** 6-8 hours

**Files with `any` types:**
- `src/pages/Devices/Devices.tsx` (line 585)
- `src/pages/CommunityFeedback/CommunityFeedback.tsx`
- `src/pages/Dashboard/Dashboard.tsx`
- Other component files

**Requirements:**
1. Create `src/types/index.ts` with all types:
   ```typescript
   // types/index.ts
   export interface Device {
     id: string;
     customBinId: string;
     location: string;
     deviceType: 'bin' | 'truck' | 'compactor';
     status: 'active' | 'maintenance' | 'inactive';
     facilityId: string;
     createdAt: Date;
   }

   export interface Alert {
     id: string;
     deviceId: string;
     device?: Device;
     severity: 'low' | 'medium' | 'high' | 'critical';
     title: string;
     description: string;
     createdAt: Date;
   }

   export interface User {
     id: string;
     email: string;
     name: string;
     role: 'ADMIN' | 'MANAGER' | 'COLLECTOR';
     status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
   }
   ```
2. Replace all `any` with proper interfaces
3. Enable strict TypeScript checking:
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true
     }
   }
   ```
4. Fix type errors that appear

**Type Imports:**
```typescript
import type { Device, Alert, User } from '@/types';

// Use in components
const [devices, setDevices] = useState<Device[]>([]);
const handleEvent = (log: any) => { // Remove this any
```

**Success Criteria:**
- ✓ No `any` types in codebase
- ✓ `noImplicitAny` enabled
- ✓ TypeScript strict mode enabled
- ✓ No type errors on build

---

### 4.2 Create Reusable API Service

**Priority:** MEDIUM  
**Effort:** 4-5 hours  
**Dependencies:** Phase 2

**Current Problem:**
- Repeated `authFetch` calls across components
- Inconsistent error handling
- No retry logic
- Token refresh not centralized

**Requirements:**
1. Create `src/services/apiService.ts`
2. Define typed API methods:
   ```typescript
   const apiService = {
     // Alerts
     getAlerts: (page: number) => fetch<Alert[]>(`/api/alerts?page=${page}`),
     createAlert: (data: CreateAlertInput) => fetch<Alert>(`/api/alerts`, { method: 'POST', body: JSON.stringify(data) }),
     
     // Devices
     getDevices: (facilityId?: string) => fetch<Device[]>(`/api/devices${facilityId ? `?facilityId=${facilityId}` : ''}`),
     updateDevice: (id: string, data: Partial<Device>) => fetch<Device>(`/api/devices/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
     
     // Users
     getUsers: () => fetch<User[]>(`/api/users`),
     updateUser: (id: string, data: Partial<User>) => fetch<User>(`/api/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
   };
   ```
3. Centralize error handling:
   - 401 → refresh token and retry
   - 403 → redirect to login
   - Network error → retry with backoff
4. Add request/response interceptors
5. Type all responses

**API Service Structure:**
```typescript
// services/apiService.ts
class ApiService {
  private baseUrl = import.meta.env.VITE_API_BASE_URL;
  private retryCount = 3;

  async fetch<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    let lastError: Error;

    for (let i = 0; i < this.retryCount; i++) {
      try {
        const response = await authFetch(
          `${this.baseUrl}${endpoint}`,
          options
        );

        if (!response.ok) {
          if (response.status === 401) {
            await this.refreshToken();
            continue; // Retry
          }
          throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json() as Promise<T>;
      } catch (err) {
        lastError = err as Error;
        if (i < this.retryCount - 1) {
          await this.delay(Math.pow(2, i) * 1000); // Exponential backoff
        }
      }
    }

    throw lastError!;
  }
}

export const apiService = new ApiService();
```

**Usage in Components:**
```typescript
const [alerts, setAlerts] = useState<Alert[]>([]);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  apiService
    .fetch<Alert[]>('/api/alerts')
    .then(setAlerts)
    .catch(err => setError(err.message));
}, []);
```

**Success Criteria:**
- ✓ All API calls go through apiService
- ✓ Consistent error handling
- ✓ Auto-retry on failure
- ✓ Token refresh handled automatically
- ✓ Full TypeScript types on responses

---

### 4.3 Split Large Components

**Priority:** MEDIUM  
**Effort:** 6-8 hours

**Components to Refactor:**

#### Login.tsx (700+ lines)
**Split into:**
```
pages/Login/
├── Login.tsx (main component, ~150 lines)
├── LoginForm.tsx (form logic, ~200 lines)
├── LoginRightPanel.tsx (branding, ~150 lines)
└── useLoginForm.ts (custom hook for form state)
```

#### Landing.tsx (730+ lines)
**Split into:**
```
pages/Landing/
├── Landing.tsx (main component, ~100 lines)
├── Hero.tsx (hero section, ~100 lines)
├── Features.tsx (features section, ~150 lines)
├── Operations.tsx (operations section, ~150 lines)
├── Inquiry.tsx (inquiry form, ~150 lines)
└── Footer.tsx (footer, ~80 lines)
```

#### Dashboard.tsx (600+ lines)
**Split into:**
```
pages/Dashboard/
├── Dashboard.tsx (main, ~100 lines)
├── MetricsGrid.tsx (KPI cards, ~100 lines)
├── ThroughputChart.tsx (chart, ~100 lines)
├── WasteCategoriesChart.tsx (chart, ~100 lines)
├── ContaminationEventsTable.tsx (table, ~100 lines)
└── ExportPDF.tsx (PDF logic, ~100 lines)
```

**Refactoring Rules:**
1. Keep page component < 150 lines
2. Extract UI sections into components
3. Pass data via props
4. Use custom hooks for state logic
5. Use React.memo for expensive renders
6. Document prop interfaces

**Example Refactoring:**
```typescript
// Before (in monolithic component)
{isExporting && <div>Exporting...</div>}
<button onClick={handleExportPDF}>Export</button>

// After (split into ExportButton.tsx)
interface ExportButtonProps {
  onExport: () => Promise<void>;
  isLoading?: boolean;
}

export function ExportButton({ onExport, isLoading }: ExportButtonProps) {
  return (
    <button onClick={onExport} disabled={isLoading}>
      {isLoading ? 'Exporting...' : 'Export PDF'}
    </button>
  );
}
```

**Success Criteria:**
- ✓ No component > 150 lines
- ✓ Components have clear single responsibility
- ✓ Props are typed
- ✓ No prop drilling > 2 levels
- ✓ Tests easier to write

---

### 4.4 Standardize Hook Usage

**Priority:** MEDIUM  
**Effort:** 5-6 hours

**Current Problem:**
- Repeated `useState + useEffect + fetch` patterns
- Inconsistent loading/error states
- No centralized auth state

**Requirements:**
1. Create `src/hooks/useApi.ts`:
   ```typescript
   interface UseApiState<T> {
     data: T | null;
     loading: boolean;
     error: Error | null;
     retry: () => Promise<void>;
   }

   function useApi<T>(
     url: string,
     options?: { enabled?: boolean; deps?: any[] }
   ): UseApiState<T> {
     const [data, setData] = useState<T | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<Error | null>(null);

     const fetchData = useCallback(async () => {
       setLoading(true);
       try {
         const result = await apiService.fetch<T>(url);
         setData(result);
         setError(null);
       } catch (err) {
         setError(err as Error);
       } finally {
         setLoading(false);
       }
     }, [url]);

     useEffect(() => {
       if (options?.enabled === false) return;
       fetchData();
     }, [fetchData, options?.enabled, ...(options?.deps ?? [])]);

     return { data, loading, error, retry: fetchData };
   }
   ```

2. Create `src/hooks/useAuth.ts`:
   ```typescript
   function useAuth() {
     const [user, setUser] = useState<User | null>(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const checkSession = async () => {
         const { data: { session } } = await supabase.auth.getSession();
         if (session) {
           // Get user from DB
           const user = await apiService.fetch<User>(`/api/users/${session.user.id}`);
           setUser(user);
         }
         setLoading(false);
       };
       checkSession();
     }, []);

     const logout = async () => {
       await supabase.auth.signOut();
       setUser(null);
     };

     return { user, loading, logout };
   }
   ```

3. Create `src/hooks/useFacility.ts`:
   - Get facility from context
   - Handle facility switching

4. Usage in components:
   ```typescript
   function Alerts() {
     const { data: alerts, loading, error } = useApi<Alert[]>('/api/alerts');
     const { user } = useAuth();

     if (loading) return <Skeleton />;
     if (error) return <ErrorMessage error={error} />;

     return <AlertsList alerts={alerts} />;
   }
   ```

**Success Criteria:**
- ✓ No repeated fetch/loading/error patterns
- ✓ All state management in custom hooks
- ✓ Components focus on rendering
- ✓ Easier to test (mock hooks)

---

## Phase 5: Database Improvements 🗄️

### 5.1 Add Missing Indexes

**Priority:** HIGH  
**Effort:** 2-3 hours

**Current Issue:**
- No indexes on frequently queried fields
- Full table scans on large tables
- Slow filters and sorts

**Requirements:**
1. Identify frequently queried fields:
   - `facilityId` - scope queries by facility
   - `createdAt` - sorting/filtering by date
   - `deviceId` - device event lookups
   - `status` - status filtering
   - `severity` - alert filtering
   - `email` - user lookups
2. Add indexes to `prisma/schema.prisma`:
   ```prisma
   model Alert {
     id String @id
     deviceId String
     severity String
     createdAt DateTime @default(now())
     
     @@index([deviceId])
     @@index([severity])
     @@index([createdAt])
   }

   model Device {
     id String @id
     facilityId String
     customBinId String
     
     @@index([facilityId])
     @@index([customBinId])
   }

   model AuditLog {
     id String @id
     action String
     createdAt DateTime @default(now())
     
     @@index([action])
     @@index([createdAt])
   }
   ```
3. Create migration: `prisma migrate dev --name add_indexes`
4. Test query performance before/after

**Success Criteria:**
- ✓ All frequently filtered fields indexed
- ✓ Query plans use indexes (EXPLAIN ANALYZE)
- ✓ Queries < 100ms for reasonable datasets
- ✓ No migration failures

---

### 5.2 Optimize Audit Log Queries

**Priority:** MEDIUM  
**Effort:** 2-3 hours

**Current Issue:**
- Audit log endpoint fetches all 50 records
- No pagination
- No field selection (over-fetching)

**Requirements:**
1. Add pagination to audit log endpoint:
   ```javascript
   app.get('/api/audit-logs', requireAdmin, async (req, res) => {
     const page = parseInt(req.query.page) || 1;
     const limit = 20;
     const skip = (page - 1) * limit;

     const [logs, total] = await Promise.all([
       prisma.auditLog.findMany({
         skip,
         take: limit,
         select: { id: true, action: true, actorName: true, details: true, createdAt: true },
         orderBy: { createdAt: 'desc' }
       }),
       prisma.auditLog.count()
     ]);

     res.json({
       data: logs,
       pagination: {
         page,
         limit,
         total,
         pages: Math.ceil(total / limit)
       }
     });
   });
   ```
2. Add `select` to return only needed fields (not entire records)
3. Use compound indexes for common filter + sort combos

**Before/After Performance:**
- Before: Fetch 50 records, all fields → 5+ MB response
- After: Fetch 20 records, select fields → 50 KB response

**Success Criteria:**
- ✓ Audit log paginated (20 per page)
- ✓ Only necessary fields returned
- ✓ Response time < 50ms
- ✓ Frontend handles pagination

---

### 5.3 Connection Pool Configuration

**Priority:** MEDIUM  
**Effort:** 1-2 hours

**Current Issue:**
- No connection pool configuration
- May hit connection limits under load
- No idle connection cleanup

**Requirements:**
1. Update `smartsort-backend/server.js`:
   ```javascript
   const pool = new Pool({
     connectionString: databaseUrl,
     ssl: isSupabaseDatabase ? { rejectUnauthorized: false } : undefined,
     max: 20, // Max connections
     min: 5, // Min connections to keep alive
     idleTimeoutMillis: 30000, // Close idle after 30s
     connectionTimeoutMillis: 2000, // Wait 2s to get connection
   });

   const prisma = new PrismaClient({
     adapter: new PrismaPg(pool),
     log: ['error', 'warn'], // Log errors and warnings only
   });
   ```
2. Add health check for pool:
   ```javascript
   app.get('/health', (req, res) => {
     res.json({
       status: 'ok',
       database: 'connected',
       poolSize: pool.totalCount,
       availableConnections: pool.availableObjectsCount
     });
   });
   ```

**Success Criteria:**
- ✓ Connection pool properly configured
- ✓ No connection limit errors
- ✓ Health check endpoint works
- ✓ Logs show pool status

---

## Phase 6: ML Model Improvements 🤖

### 6.1 Add Error Handling to Flask App

**Priority:** HIGH  
**Effort:** 3-4 hours

**Current Issue:**
- No try-catch around model inference
- No error responses
- Silent failures

**Requirements:**
1. Wrap model inference in error handling:
   ```python
   @app.route('/predict', methods=['POST'])
   def predict():
     try:
       if 'image' not in request.files:
         return jsonify({ 'error': 'No image provided' }), 400
       
       file = request.files['image']
       image = Image.open(io.BytesIO(file.read()))
       
       # Inference
       predictions = model.predict(image)
       
       return jsonify({
         'predictions': predictions,
         'confidence': float(predictions.max()),
         'class': class_names[predictions.argmax()]
       })
     except Exception as e:
       logger.error(f"Prediction error: {e}")
       return jsonify({
         'error': 'Prediction failed',
         'code': 'INFERENCE_ERROR'
       }), 500
   ```
2. Add logging:
   ```python
   import logging
   logger = logging.getLogger(__name__)
   logging.basicConfig(level=logging.INFO)
   ```
3. Add health check endpoint
4. Log all predictions (for model improvement)

**Success Criteria:**
- ✓ All endpoints return valid JSON on error
- ✓ Errors logged with context
- ✓ 500 errors for actual failures
- ✓ 400 errors for bad requests

---

### 6.2 Add CORS & Security

**Priority:** MEDIUM  
**Effort:** 2-3 hours

**Requirements:**
1. Add Flask-CORS:
   ```bash
   pip install flask-cors
   ```
2. Configure CORS:
   ```python
   from flask_cors import CORS

   CORS(app, resources={
     r"/api/*": {
       "origins": [os.getenv('FRONTEND_URL')],
       "methods": ["POST", "GET"],
       "max_age": 3600
     }
   })
   ```
3. Add request size limits:
   ```python
   app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB
   ```
4. Add request timeout:
   ```python
   @app.route('/predict', methods=['POST'])
   @timeout(30)  # 30 second timeout
   def predict():
     ...
   ```
5. Add authentication (bearer token):
   ```python
   def verify_token(f):
     @wraps(f)
     def decorated(*args, **kwargs):
       token = request.headers.get('Authorization')
       if not token or not token.startswith('Bearer '):
         return jsonify({ 'error': 'Unauthorized' }), 401
       # Verify token...
       return f(*args, **kwargs)
     return decorated

   @app.route('/predict', methods=['POST'])
   @verify_token
   def predict():
     ...
   ```

**Success Criteria:**
- ✓ CORS configured properly
- ✓ Request size limited
- ✓ Requests timeout after 30s
- ✓ Bearer token required

---

### 6.3 Create Docker Support

**Priority:** MEDIUM  
**Effort:** 3-4 hours

**Requirements:**
1. Create `smartsort-ml/Dockerfile`:
   ```dockerfile
   FROM python:3.11-slim

   WORKDIR /app

   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   EXPOSE 5001
   HEALTHCHECK --interval=30s --timeout=10s --start-period=10s CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5001/health')"

   CMD ["python", "app.py"]
   ```
2. Update `smartsort-ml/requirements.txt`:
   ```
   Flask==3.0.0
   Flask-CORS==4.0.0
   numpy==1.24.3
   Pillow==10.0.0
   ai-edge-litert==0.14.0
   python-dotenv==1.0.0
   ```
3. Create `.dockerignore`:
   ```
   __pycache__
   *.pyc
   .env
   .git
   ```
4. Build and test:
   ```bash
   docker build -t smartsort-ml .
   docker run -p 5001:5001 smartsort-ml
   ```

**Success Criteria:**
- ✓ Docker image builds successfully
- ✓ Container runs and serves predictions
- ✓ Health check works
- ✓ Image < 1 GB

---

## Phase 7: Testing 🧪

### 7.1 Backend Unit Tests

**Priority:** MEDIUM  
**Effort:** 8-10 hours  
**Dependencies:** Phase 3

**Requirements:**
1. Install packages:
   ```bash
   npm install --save-dev jest @types/jest
   ```
2. Configure Jest in `smartsort-backend/package.json`:
   ```json
   {
     "jest": {
       "testEnvironment": "node",
       "collectCoverageFrom": ["services/**/*.js", "controllers/**/*.js"],
       "coverageThreshold": { "global": { "lines": 70 } }
     }
   }
   ```
3. Create test structure:
   ```
   smartsort-backend/tests/
   ├── services/
   │   ├── userService.test.js
   │   ├── deviceService.test.js
   │   └── jobService.test.js
   ├── utils/
   │   ├── validators.test.js
   │   └── errorHandler.test.js
   └── integration/
       ├── auth.test.js
       └── users.test.js
   ```
4. Test service layer:
   ```javascript
   // tests/services/userService.test.js
   const userService = require('../../services/userService');
   const prisma = require('../../lib/prisma');

   jest.mock('../../lib/prisma');

   describe('UserService', () => {
     test('createUser creates a new user', async () => {
       const userData = { email: 'test@example.com', name: 'Test' };
       prisma.user.create.mockResolvedValue({ id: '1', ...userData });

       const user = await userService.createUser(userData);

       expect(user.email).toBe('test@example.com');
       expect(prisma.user.create).toHaveBeenCalledWith({
         data: userData
       });
     });

     test('createUser throws on duplicate email', async () => {
       prisma.user.findUnique.mockResolvedValue({ id: '1' });

       await expect(
         userService.createUser({ email: 'existing@test.com' })
       ).rejects.toThrow('Email already in use');
     });
   });
   ```
5. Test error scenarios
6. Aim for 70%+ coverage on services

**Success Criteria:**
- ✓ Service layer 70%+ covered
- ✓ All error cases tested
- ✓ Mocks for Prisma queries
- ✓ Tests run in CI/CD
- ✓ `npm test` passes

---

### 7.2 Frontend Component Tests

**Priority:** MEDIUM  
**Effort:** 6-8 hours

**Requirements:**
1. Install packages:
   ```bash
   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
   ```
2. Configure Vitest in `vite.config.ts`:
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       setupFiles: ['src/test/setup.ts'],
       coverage: {
         provider: 'v8',
         reporter: ['text', 'json'],
         exclude: ['node_modules/', 'src/test/'],
       },
     },
   })
   ```
3. Create test structure:
   ```
   src/tests/
   ├── components/
   │   ├── ErrorBoundary.test.tsx
   │   └── Button.test.tsx
   ├── pages/
   │   ├── Login.test.tsx
   │   └── Dashboard.test.tsx
   └── setup.ts
   ```
4. Test critical components:
   ```typescript
   // src/tests/pages/Login.test.tsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import Login from '../../pages/Login';

   describe('Login Page', () => {
     test('renders login form', () => {
       render(<Login />);
       expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
     });

     test('shows validation errors', async () => {
       render(<Login />);
       fireEvent.click(screen.getByText('Log In'));
       expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
     });
   });
   ```

**Success Criteria:**
- ✓ Critical paths tested (login, dashboard, alerts)
- ✓ Error states tested
- ✓ 50%+ component coverage
- ✓ Tests run in CI/CD

---

### 7.3 API Integration Tests

**Priority:** MEDIUM  
**Effort:** 5-6 hours

**Requirements:**
1. Install packages:
   ```bash
   npm install --save-dev supertest
   ```
2. Create `smartsort-backend/tests/integration/`:
   ```javascript
   // tests/integration/users.test.js
   const request = require('supertest');
   const app = require('../../server');
   const prisma = require('../../lib/prisma');

   describe('User API', () => {
     test('GET /api/users requires authentication', async () => {
       const res = await request(app).get('/api/users');
       expect(res.statusCode).toBe(401);
     });

     test('PATCH /api/users/:id updates user', async () => {
       const token = 'valid-jwt-token'; // Test token
       const res = await request(app)
         .patch('/api/users/123')
         .set('Authorization', `Bearer ${token}`)
         .send({ role: 'MANAGER' });

       expect(res.statusCode).toBe(200);
       expect(res.body.data.role).toBe('MANAGER');
     });

     test('POST /api/users with invalid data returns 400', async () => {
       const token = 'valid-jwt-token';
       const res = await request(app)
         .post('/api/users')
         .set('Authorization', `Bearer ${token}`)
         .send({ email: 'invalid-email' });

       expect(res.statusCode).toBe(400);
       expect(res.body.error.code).toBe('VALIDATION_FAILED');
     });
   });
   ```

**Success Criteria:**
- ✓ All endpoints testable
- ✓ Auth errors tested (401, 403)
- ✓ Validation errors tested (400)
- ✓ Happy path tested (200)
- ✓ Tests run with test database

---

## Phase 8: DevOps & Monitoring 🚀

### 8.1 Create GitHub Actions CI/CD

**Priority:** HIGH  
**Effort:** 3-4 hours

**Requirements:**
1. Create `.github/workflows/ci.yml`:
   ```yaml
   name: CI

   on: [push, pull_request]

   jobs:
     test:
       runs-on: ubuntu-latest

       services:
         postgres:
           image: postgres:15
           env:
             POSTGRES_PASSWORD: postgres
             POSTGRES_DB: smartsort_test
           options: >-
             --health-cmd pg_isready
             --health-interval 10s
             --health-timeout 5s
             --health-retries 5

       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18

         # Backend tests
         - name: Install backend dependencies
           working-directory: ./smartsort-backend
           run: npm install

         - name: Run backend tests
           working-directory: ./smartsort-backend
           run: npm test
           env:
             DATABASE_URL: postgresql://postgres:postgres@localhost:5432/smartsort_test

         - name: Backend lint
           working-directory: ./smartsort-backend
           run: npm run lint

         # Frontend tests
         - name: Install frontend dependencies
           run: npm install

         - name: Run frontend tests
           run: npm test

         - name: Frontend lint
           run: npm run lint

         - name: Build
           run: npm run build

         # Security
         - name: Run security audit
           run: npm audit --audit-level=moderate
           continue-on-error: true
   ```
2. Create GitHub Actions for deployment (separate workflow)
3. Require PR checks pass before merge

**Success Criteria:**
- ✓ Tests run on every push
- ✓ Lint checks run
- ✓ Build verification
- ✓ Security audit runs
- ✓ PR checks required

---

### 8.2 Add Health Check Endpoints

**Priority:** MEDIUM  
**Effort:** 1-2 hours

**Requirements:**
1. Backend health check:
   ```javascript
   // server.js
   app.get('/health', async (req, res) => {
     try {
       // Check database
       const dbHealthy = await prisma.$queryRaw`SELECT 1`;

       res.status(200).json({
         status: 'ok',
         timestamp: new Date().toISOString(),
         uptime: process.uptime(),
         database: 'connected',
         version: '1.0.0',
         checks: {
           database: dbHealthy ? 'ok' : 'error',
         }
       });
     } catch (err) {
       res.status(503).json({
         status: 'error',
         database: 'disconnected',
         error: err.message
       });
     }
   });
   ```
2. ML health check (Flask app)
3. Frontend health (no endpoint needed, app status)
4. Use in:
   - Docker health checks
   - Load balancers
   - Monitoring alerts

**Success Criteria:**
- ✓ `/health` endpoint returns 200 when healthy
- ✓ `/health` returns 503 when database down
- ✓ Used in Docker HEALTHCHECK
- ✓ Monitoring tools can hit endpoint

---

### 8.3 Error Tracking Setup

**Priority:** MEDIUM  
**Effort:** 2-3 hours

**Requirements:**
1. Install Sentry (free tier available):
   ```bash
   npm install @sentry/node @sentry/tracing
   npm install --save-dev @sentry/react
   ```
2. Configure backend:
   ```javascript
   // smartsort-backend/server.js
   const Sentry = require('@sentry/node');
   const Sentry_Tracing = require('@sentry/tracing');

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     tracesSampleRate: 0.1,
     environment: process.env.NODE_ENV,
   });

   app.use(Sentry.Handlers.requestHandler());
   app.use(Sentry.Handlers.errorHandler());
   ```
3. Configure frontend:
   ```typescript
   // src/main.tsx
   import * as Sentry from "@sentry/react";

   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     environment: import.meta.env.MODE,
     tracesSampleRate: 0.1,
   });
   ```
4. Create `.env.example` entries:
   ```
   SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   ```

**Success Criteria:**
- ✓ Errors captured automatically
- ✓ Grouped by error type
- ✓ Stack traces captured
- ✓ Breadcrumbs show request context

---

## Phase 9: Documentation & Code Quality 📚

### 9.1 API Documentation

**Priority:** MEDIUM  
**Effort:** 4-5 hours

**Requirements:**
1. Create `docs/API.md`:
   ```markdown
   # SmartSort API Documentation

   ## Authentication
   All endpoints require Bearer token in Authorization header.

   ## Endpoints

   ### Get Alerts
   - **Method:** GET
   - **Path:** `/api/alerts`
   - **Query:** page=1, limit=20, severity=high
   - **Auth:** Required
   - **Response:** { data: Alert[], pagination: {...} }
   - **Errors:** 401 (unauthorized), 400 (invalid query)

   ### Create Alert
   - **Method:** POST
   - **Path:** `/api/alerts`
   - **Body:** { deviceId, severity, title, description }
   - **Auth:** Required (MANAGER+)
   - **Response:** { data: Alert }
   - **Errors:** 400 (validation), 403 (forbidden), 409 (conflict)
   ```
2. Create `docs/ARCHITECTURE.md`:
   - Project structure overview
   - Data flow diagrams
   - Key technologies
3. Add code examples for each endpoint
4. Consider Swagger/OpenAPI for interactive docs

**Success Criteria:**
- ✓ All endpoints documented
- ✓ Example requests/responses
- ✓ Auth requirements clear
- ✓ Error codes documented

---

### 9.2 Code Quality Setup

**Priority:** MEDIUM  
**Effort:** 2-3 hours

**Requirements:**
1. Create `.eslintrc.json`:
   ```json
   {
     "env": { "node": true, "es2021": true },
     "extends": ["eslint:recommended"],
     "parserOptions": { "ecmaVersion": "latest" },
     "rules": {
       "no-console": "warn",
       "no-unused-vars": "error",
       "eqeqeq": "error"
     }
   }
   ```
2. Create `.prettierrc`:
   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": true,
     "printWidth": 100
   }
   ```
3. Add npm scripts:
   ```json
   {
     "lint": "eslint . --ext .js,.ts,.tsx",
     "format": "prettier --write '**/*.{js,ts,tsx,json,md}'"
   }
   ```
4. Install husky for pre-commit hooks:
   ```bash
   npm install --save-dev husky lint-staged
   npx husky install
   ```
5. Create `.husky/pre-commit`:
   ```bash
   #!/bin/sh
   npx lint-staged
   ```
6. Create `lint-staged.config.js`:
   ```javascript
   module.exports = {
     '*.{js,ts,tsx}': 'eslint --fix',
     '*.{js,ts,tsx,json,md}': 'prettier --write'
   };
   ```

**Success Criteria:**
- ✓ ESLint configured
- ✓ Prettier formatting works
- ✓ Pre-commit hooks run
- ✓ Code auto-formats on save (VS Code extension)

---

### 9.3 Contributing Guidelines

**Priority:** LOW  
**Effort:** 1-2 hours

**Requirements:**
1. Create `CONTRIBUTING.md`:
   ```markdown
   # Contributing to SmartSort

   ## Branch Naming
   - Feature: `feature/description`
   - Bug fix: `fix/description`
   - Docs: `docs/description`
   - Example: `feature/add-realtime-alerts`

   ## Commit Messages
   ```
   [TYPE] Brief description (50 chars max)

   - Optional detailed explanation
   - Keep to 72 chars per line
   ```
   Types: feat, fix, docs, style, refactor, test, chore

   ## Pull Request Checklist
   - [ ] Tests pass (`npm test`)
   - [ ] No console errors
   - [ ] Code reviewed
   - [ ] Documentation updated
   - [ ] Lint passes (`npm run lint`)

   ## Setup Local Development
   1. Fork the repo
   2. Clone: `git clone ...`
   3. Install: `npm install`
   4. Create branch: `git checkout -b feature/...`
   5. Run: `npm run dev`
   6. Make changes
   7. Test: `npm test`
   8. Push and create PR
   ```
2. Create issue templates (`.github/ISSUE_TEMPLATE/bug_report.md`)
3. Add PR template (`.github/pull_request_template.md`)

**Success Criteria:**
- ✓ Clear development process
- ✓ Issue/PR templates in place
- ✓ Branch naming convention defined
- ✓ New contributors can follow steps

---

## Implementation Timeline

```
Week 1: FOUNDATION (Security + Logging)
- Mon-Tue: Phase 1.1-1.4 (Security fixes)
- Wed-Thu: Phase 2.1-2.2 (Error handling, logging)
- Fri: Testing & validation

Week 2: BACKEND REFACTORING
- Mon-Wed: Phase 3.1-3.3 (Split monolith, validation, services)
- Thu-Fri: Phase 4.1-4.2 (Frontend types, API service)

Week 3: DATA & ML
- Mon-Tue: Phase 5.1-5.3 (Database optimization)
- Wed-Thu: Phase 6.1-6.3 (ML improvements)
- Fri: Bug fixes

Week 4: TESTING & DEPLOYMENT
- Mon-Tue: Phase 7.1-7.3 (Tests)
- Wed-Thu: Phase 8.1-8.3 (DevOps)
- Fri: Phase 9 (Documentation), validation

Ongoing: Code review, documentation updates
```

---

## Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Test Coverage | 70% | 0% |
| Type Coverage | 100% | ~50% |
| API Error Response Rate | <1% | Unknown |
| Build Time | <5 min | Unknown |
| Security Issues | 0 Critical | 3+ |
| Component Size | <200 LOC | 700+ LOC |
| Code Duplication | <5% | ~15% |
| Performance (API) | <100ms p95 | Unknown |

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Breaking changes in refactoring | Medium | High | Feature branch, tests verify API compatibility |
| Performance regression | Medium | Medium | Benchmark before/after, revert if needed |
| Test failures in CI/CD | High | Low | Fix tests incrementally, skip non-critical initially |
| Database migration issues | Low | High | Test migrations on copy of prod data |
| Team productivity hit | Medium | Medium | Phased rollout, clear documentation |

---

## Dependencies & Prerequisites

- Node.js 18+
- PostgreSQL 13+
- Docker (optional, for containerization)
- Git for version control
- ESLint, Prettier for code quality
- Jest, Vitest for testing
- Sentry account (free tier)
- GitHub Actions (included in repo)

---

## Sign-Off

**Prepared by:** AI Assistant  
**Date:** 2026-07-01  
**Version:** 1.0  

---

## Appendix: Quick Reference Commands

```bash
# Backend testing
cd smartsort-backend
npm test
npm run lint

# Frontend testing
npm test
npm run lint

# Build
npm run build

# Development
npm run dev

# Database
npx prisma migrate dev
npx prisma studio

# Docker
docker build -t smartsort-ml smartsort-ml/
docker run -p 5001:5001 smartsort-ml

# Git workflow
git checkout -b feature/description
git commit -m "[feat] Description"
git push origin feature/description
# Create PR on GitHub
```

---

**End of PRD**
