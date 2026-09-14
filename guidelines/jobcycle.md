sequenceDiagram
    autonumber
    actor Sensor as IoT Smart Bin / Cron
    actor Manager as Facility Manager
    participant Backend as Node.js Backend & DB
    actor Collector as Waste Collector (App)

    %% 1. Generation
    critical Step 1: Job Creation
        Sensor->>Backend: Telemetry reports fillLevel >= 80% (or Cron auto-schedules)
        Note over Backend: Auto-creates CollectionJob (Status: Pending, Priority: Urgent/High)
        Backend-->>Manager: Real-time Alert & WebSocket event on Dashboard
    end

    %% 2. Assignment
    critical Step 2: Job Assignment
        alt Manager Dispatches
            Manager->>Backend: PATCH /api/jobs/:id (Assigns collectorId)
        else Collector Claims
            Collector->>Backend: PATCH /api/jobs/:id (Claims bin from "Available Bins")
        end
        Backend-->>Collector: Real-time Toast & Route Notification ("New Collection Task")
    end

    %% 3. Collection & Routing
    critical Step 3: Collection & Navigation
        Collector->>Collector: Status moves to "In Transit"
        Collector->>Collector: 2-Opt TSP algorithm optimizes route (Critical -> High -> Normal)
        Collector->>Sensor: Physically navigates to bin & empties waste compartments
    end

    %% 4. Completion Confirmation
    critical Step 4: Completion Confirmation
        Collector->>Collector: Taps "Mark Done" in Collector Dashboard
        Note over Collector: Checklist Modal appears (Bin emptied, lid closed, area clean)
        Collector->>Backend: Submits "Confirm Complete" (PATCH status: "Completed")
        Backend-->>Collector: Quota Progress Ring updates (+1 toward daily quota)
        Backend-->>Manager: Job card moves to "Completed" column in Board View
    end
