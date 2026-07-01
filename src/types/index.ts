export type UserRole = 'ADMIN' | 'MANAGER' | 'COLLECTOR';
export type UserStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED';

export interface User {
  id: string;
  name: string;
  email: string | null;
  role: UserRole | null;
  status: UserStatus | string;
  rating: number;
  avatar: string | null;
  assignedFacility: string | null;
  facilityId?: string | null;
  region: string | null;
  authId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type DeviceStatus = 'Active' | 'Online' | 'Full' | 'Offline' | 'Maintenance';

export interface Device {
  id: string;
  customBinId: string;
  location: string;
  fillLevel: number;
  status: DeviceStatus;
  lastSortedItem?: string | null;
  deviceType?: string | null;
  facilityId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus = 'Pending' | 'In Transit' | 'Completed';
export type JobUrgency = 'Normal' | 'Medium' | 'High' | 'Critical';

export interface CollectionJob {
  id: string;
  device: string;
  type: string;
  location: string;
  zone: string;
  fill: number;
  urgency: JobUrgency;
  responseTime: string;
  status: JobStatus;
  assignedTo: string | null;
  distance?: string;
  completedTime?: string;
  sortOrder: number;
}

export interface BulkCollectionJob {
  id: string;
  facilityId: string;
  facility?: { name: string };
  tonnage: number;
  collectorName: string;
  collectorId: string | null;
  scheduledFor: string | null;
  status: 'Pending' | 'Dispatched' | 'Completed';
  completedAt?: string | null;
  createdAt: string;
}

export interface AlertAction {
  label: string;
  type: 'primary' | 'secondary';
}

export interface Alert {
  id: string;
  deviceIcon: string;
  deviceName: string;
  deviceLocation: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  messageTitle: string;
  messageDesc: string;
  timestampMain: string;
  timestampSub: string;
  actions: AlertAction[];
}

export interface Feedback {
  id: string;
  userName: string;
  location: string;
  category: string;
  message: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actorName: string;
  details: string;
  color: string;
  createdAt: string;
}

export interface DashboardSummary {
  devices: {
    active: number;
    total: number;
    averageFill: number;
  };
  jobs: {
    pending: number;
    inTransit: number;
    completed: number;
  };
  feedback: {
    pending: number;
    inProgress: number;
    resolved: number;
  };
}

export interface DashboardMetrics {
  deviceStatus: string;
  totalItemsSorted: string;
  recyclingRate: string;
  contaminationRate: string;
}

export interface ThroughputData {
  time: string;
  sorted: number;
  rejected: number;
}

export interface WasteCategoryData {
  category: string;
  percentage: number;
}

export interface ContaminationEvent {
  id: string;
  time: string;
  source: string;
  detection: string;
  detectionType: 'danger' | 'warning' | 'info';
  confidence: string;
  img: string | null;
  action: string;
}

export interface HistoricalAnalyticsData {
  name: string;
  recycling: number;
  contamination: number;
}

export interface Facility {
  id: string;
  name: string;
  region: string;
  status: string;
  latitude: number;
  longitude: number;
  deviceCount: number;
  activeDevices: number;
  averageFill: number;
  pendingTonnage: number;
  alertCount: number;
}
