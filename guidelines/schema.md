## Table `_prisma_migrations`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `varchar` | Primary |
| `checksum` | `varchar` |  |
| `finished_at` | `timestamptz` |  Nullable |
| `migration_name` | `varchar` |  |
| `logs` | `text` |  Nullable |
| `rolled_back_at` | `timestamptz` |  Nullable |
| `started_at` | `timestamptz` |  |
| `applied_steps_count` | `int4` |  |

## Table `Device`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `customBinId` | `text` |  |
| `location` | `text` |  |
| `fillLevel` | `int4` |  |
| `status` | `text` |  |
| `lastSortedItem` | `text` |  Nullable |
| `updatedAt` | `timestamp` |  |
| `createdAt` | `timestamp` |  |
| `deviceType` | `text` |  |
| `facilityId` | `text` |  Nullable |
| `fillLevelGlass` | `int4` |  |
| `fillLevelMetal` | `int4` |  |
| `fillLevelPaper` | `int4` |  |
| `fillLevelRejected` | `int4` |  |

## Table `CollectionJob`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `status` | `text` |  |
| `priority` | `text` |  |
| `wasteType` | `text` |  |
| `createdAt` | `timestamp` |  |
| `deviceId` | `text` |  |
| `collectorId` | `text` |  Nullable |

## Table `User`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `authId` | `text` |  Nullable |
| `email` | `text` |  |
| `name` | `text` |  |
| `role` | `text` |  |
| `status` | `text` |  |
| `avatar` | `text` |  Nullable |
| `assignedFacility` | `text` |  Nullable |
| `region` | `text` |  Nullable |
| `rating` | `float8` |  Nullable |
| `createdAt` | `timestamp` |  |
| `updatedAt` | `timestamp` |  |
| `facilityId` | `text` |  Nullable |

## Table `Feedback`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `message` | `text` |  |
| `category` | `text` |  |
| `createdAt` | `timestamp` |  |
| `location` | `text` |  Nullable |
| `status` | `text` |  |
| `userName` | `text` |  Nullable |

## Table `ProcessedItem`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `deviceId` | `text` |  |
| `category` | `text` |  |
| `status` | `text` |  |
| `rejectionReason` | `text` |  Nullable |
| `confidence` | `float8` |  |
| `imageUrl` | `text` |  Nullable |
| `actionTaken` | `text` |  |
| `createdAt` | `timestamp` |  |

## Table `Alert`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `deviceId` | `text` |  Nullable |
| `severity` | `text` |  |
| `title` | `text` |  |
| `description` | `text` |  |
| `status` | `text` |  |
| `createdAt` | `timestamp` |  |
| `updatedAt` | `timestamp` |  |
| `facilityId` | `text` |  Nullable |

## Table `DeviceEvent`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `deviceId` | `text` |  |
| `eventType` | `text` |  |
| `description` | `text` |  |
| `severity` | `text` |  |
| `createdAt` | `timestamp` |  |

## Table `Facility`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `name` | `text` |  |
| `region` | `text` |  Nullable |
| `status` | `text` |  |
| `latitude` | `float8` |  |
| `longitude` | `float8` |  |
| `createdAt` | `timestamp` |  |
| `updatedAt` | `timestamp` |  |

## Table `BulkCollectionJob`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `facilityId` | `text` |  |
| `status` | `text` |  |
| `tonnage` | `float8` |  |
| `collectorName` | `text` |  |
| `collectorId` | `text` |  Nullable |
| `scheduledFor` | `timestamp` |  Nullable |
| `completedAt` | `timestamp` |  Nullable |
| `createdAt` | `timestamp` |  |

## Table `AuditLog`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `action` | `text` |  |
| `actorName` | `text` |  |
| `details` | `text` |  |
| `color` | `text` |  |
| `createdAt` | `timestamp` |  |

## RLS Policies

### `Facility`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow select for authenticated users` | SELECT | authenticated | PERMISSIVE | `true` | — |

### `BulkCollectionJob`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow select for authenticated users` | SELECT | authenticated | PERMISSIVE | `true` | — |

### `Device`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow select for authenticated users` | SELECT | authenticated | PERMISSIVE | `true` | — |

### `CollectionJob`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow select for authenticated users` | SELECT | authenticated | PERMISSIVE | `true` | — |

### `User`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow select for authenticated users` | SELECT | authenticated | PERMISSIVE | `true` | — |

### `Alert`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow select for authenticated users` | SELECT | authenticated | PERMISSIVE | `true` | — |

### `Feedback`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow select for authenticated users` | SELECT | authenticated | PERMISSIVE | `true` | — |

### `ProcessedItem`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow select for authenticated users` | SELECT | authenticated | PERMISSIVE | `true` | — |

### `DeviceEvent`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow select for authenticated users` | SELECT | authenticated | PERMISSIVE | `true` | — |

### `AuditLog`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow select for authenticated users` | SELECT | authenticated | PERMISSIVE | `true` | — |

