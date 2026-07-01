const { z } = require('zod');

const userRoleSchema = z.enum(['ADMIN', 'MANAGER', 'COLLECTOR', 'VIEWER', 'THIRD_PARTY_COLLECTOR']);
const userStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING', 'Active', 'Inactive', 'On Leave', 'Pending']);

const schemas = {
  user: {
    create: z.object({
      name: z.string().min(1, 'Name is required').max(255),
      email: z.string().email('Invalid email format').optional().or(z.literal('')),
      role: userRoleSchema.optional(),
      status: userStatusSchema.optional(),
      assignedFacility: z.string().max(255).optional(),
      avatar: z.string().url().nullable().optional().or(z.literal('')),
      facilityId: z.string().nullable().optional(),
    }),
    update: z.object({
      name: z.string().min(1).max(255).optional(),
      email: z.string().email('Invalid email format').optional().or(z.literal('')),
      role: userRoleSchema.optional(),
      status: userStatusSchema.optional(),
      assignedFacility: z.string().max(255).optional(),
      avatar: z.string().url().nullable().optional().or(z.literal('')),
    }),
  },
  device: {
    create: z.object({
      customBinId: z.string().min(1, 'Custom Bin ID is required').max(50),
      location: z.string().min(1, 'Location is required').max(255),
      deviceType: z.enum(['bin', 'truck', 'compactor', 'conveyor', 'sensor']).optional(),
      facilityId: z.string().nullable().optional(),
    }),
    update: z.object({
      location: z.string().min(1).max(255).optional(),
      status: z.enum(['Active', 'Offline', 'Maintenance', 'Full', 'Online']).optional(),
      fillLevel: z.number().min(0).max(100).optional(),
      lastSortedItem: z.string().max(255).nullable().optional(),
    }),
  },
  job: {
    create: z.object({
      device: z.string().min(1, 'Device is required'),
      location: z.string().min(1, 'Location is required'),
      fill: z.number().or(z.string()).optional(),
      urgency: z.enum(['Normal', 'Medium', 'High', 'Critical']).optional(),
      type: z.string().optional(),
      collectorId: z.string().nullable().optional(),
    }),
    update: z.object({
      status: z.enum(['Pending', 'In Progress', 'Completed', 'In Transit']).optional(),
      collectorId: z.string().nullable().optional(),
    }),
  },
  auditLog: {
    create: z.object({
      action: z.string().min(1, 'Action is required').max(255),
      actorName: z.string().min(1, 'Actor name is required').max(255),
      details: z.string().min(1, 'Details are required'),
      color: z.string().max(50).optional(),
    }),
  },
};

module.exports = { schemas };
