/*
 * SmartSort — Arduino UNO Firmware
 * ==================================
 * M1: Trigger sensor — detects item in landing zone, sends TRIGGER to ESP32
 * M4: Stepper motor route control (28BYJ-48 via ULN2003)
 * M5: SG90 Servo flap gate
 * M6: Fill-level sensing (3× HC-SR04)
 *
 * Communicates with ESP32-CAM over SoftwareSerial (pins 10, 11)
 *
 * Wiring Summary:
 *   Power       → MB102 Power Supply Module v2 powering the breadboard
 *   Arduino GND → Breadboard GND rail (Common Ground is REQUIRED)
 *   Pin 10 (RX) ← ESP32 GPIO 1 (TX)   [White wire]
 *   Pin 11 (TX) → ESP32 GPIO 3 (RX)   [Blue wire]
 *   Pin 9       → SG90 Servo Signal    [Orange wire]
 *   Pin 8,7,6,5 → ULN2003 IN1-IN4     [Stepper]
 *   Pin 4       → HC-SR04 #1 TRIG     [Landing zone trigger]
 *   Pin 12      → HC-SR04 #1 ECHO     [Landing zone echo]
 *   A0,A1       → HC-SR04 #2          [Glass bin fill sensor]
 *   A2,A3       → HC-SR04 #3          [Metal bin fill sensor]
 *   Pin 2,3     → HC-SR04 #4          [Paper/Plastic bin fill sensor]
 */

#include <SoftwareSerial.h>
#include <Servo.h>
#include <Stepper.h>

// ══════════════════════════════════════════════════════════════════════════════
//  SERIAL TO ESP32-CAM
// ══════════════════════════════════════════════════════════════════════════════
// Pin 10 = RX (receives from ESP32-CAM TX/GPIO 1)
// Pin 11 = TX (sends to ESP32-CAM RX/GPIO 3)
SoftwareSerial espSerial(10, 11);

// ══════════════════════════════════════════════════════════════════════════════
//  SERVO (Landing Zone Flap Gate)
// ══════════════════════════════════════════════════════════════════════════════
Servo flapServo;
#define SERVO_PIN        9
#define FLAP_CLOSED_DEG  0    // Closed angle (holding item)
#define FLAP_OPEN_DEG    90   // Open angle (releasing item)
#define FLAP_HOLD_MS     2000 // How long to hold flap open (ms)

// ══════════════════════════════════════════════════════════════════════════════
//  STEPPER MOTOR (28BYJ-48 via ULN2003)
// ══════════════════════════════════════════════════════════════════════════════
// 28BYJ-48 = 2048 steps per revolution in half-step mode (internal gearing)
#define STEPS_PER_REV   2048
#define STEPPER_IN1      8
#define STEPPER_IN2      7
#define STEPPER_IN3      6
#define STEPPER_IN4      5
#define STEPPER_SPEED    12   // RPM (28BYJ-48 max ~15 RPM, keep conservative)

// IMPORTANT: Pin order for ULN2003 with Stepper library is IN1, IN3, IN2, IN4
// (not sequential!) — this gives the correct half-step firing sequence.
Stepper stepper(STEPS_PER_REV, STEPPER_IN1, STEPPER_IN3, STEPPER_IN2, STEPPER_IN4);

int currentAngle = 0; // Track current stepper position in degrees

// ══════════════════════════════════════════════════════════════════════════════
//  BIN ANGLE MAP (STRAIGHT LINE LAYOUT)
// ══════════════════════════════════════════════════════════════════════════════
// Bins arranged in a straight line. Stepper rotates a deflector chute.
// Angles are relative to the "home" position (0° = leftmost bin).
//
// *** CALIBRATE THESE ANGLES to match your physical bin spacing! ***
//
// Physical layout:
//   [Glass 0°] [Metal 45°] [Paper/Plastic 90°] [Rejected 135°]
//
struct BinConfig {
  const char* name;
  int         angle;     // Target angle in degrees
};

BinConfig bins[] = {
  { "glass",          0   },  // Bin 1: Leftmost (home position)
  { "metal",          45  },  // Bin 2: 45° from home
  { "paper",          90  },  // Bin 3: 90° from home (paper/plastic shared)
  { "plastic",        90  },  // Bin 3: Same angle as paper
  { "rejected_waste", 135 },  // Bin 4: Rightmost
};
const int NUM_BINS = sizeof(bins) / sizeof(bins[0]);

// ══════════════════════════════════════════════════════════════════════════════
//  TRIGGER SENSOR (Landing Zone — detects item placement)
// ══════════════════════════════════════════════════════════════════════════════
#define TRIGGER_TRIG_PIN     4
#define TRIGGER_ECHO_PIN    12
#define TRIGGER_DISTANCE_CM 15.0   // Item detected if closer than this
#define TRIGGER_DEBOUNCE_MS 5000   // Ignore re-triggers for 5 seconds
                                   // (enough for capture + sort cycle)

unsigned long lastTriggerTime = 0;
unsigned long lastSerialMonitorTime = 0;
bool sortingInProgress = false;

// How often to print fill levels to USB Serial Monitor (for debugging)
// This prints even without ESP32 asking — useful when connected to PC
#define SERIAL_MONITOR_INTERVAL_MS 10000  // Every 10 seconds

// ══════════════════════════════════════════════════════════════════════════════
//  FILL-LEVEL SENSORS (3 sensors — rejected bin has no sensor yet)
// ══════════════════════════════════════════════════════════════════════════════
struct UltrasonicSensor {
  int trigPin;
  int echoPin;
  const char* label;
};

UltrasonicSensor fillSensors[] = {
  { A0, A1, "glass"         },  // Bin 1
  { A2, A3, "metal"         },  // Bin 2
  {  2,  3, "paper_plastic" },  // Bin 3
};
const int NUM_FILL_SENSORS = sizeof(fillSensors) / sizeof(fillSensors[0]);

// ══════════════════════════════════════════════════════════════════════════════
//  SETUP
// ══════════════════════════════════════════════════════════════════════════════
void setup() {
  Serial.begin(9600);       // Debug output via USB Serial Monitor
  espSerial.begin(9600);    // Communication with ESP32-CAM

  // Servo — start closed
  flapServo.attach(SERVO_PIN);
  flapServo.write(FLAP_CLOSED_DEG);

  // Stepper speed
  stepper.setSpeed(STEPPER_SPEED);

  // Trigger sensor pins
  pinMode(TRIGGER_TRIG_PIN, OUTPUT);
  pinMode(TRIGGER_ECHO_PIN, INPUT);

  // Fill-level sensor pins
  for (int i = 0; i < NUM_FILL_SENSORS; i++) {
    pinMode(fillSensors[i].trigPin, OUTPUT);
    pinMode(fillSensors[i].echoPin, INPUT);
  }

  Serial.println(F("================================"));
  Serial.println(F("  SmartSort Arduino UNO Ready"));
  Serial.println(F("================================"));
  Serial.println(F("Trigger sensor: Pin 4/12"));
  Serial.println(F("Servo: Pin 9"));
  Serial.println(F("Stepper: Pins 5-8 via ULN2003"));
  Serial.print(F("Fill sensors: "));
  Serial.println(NUM_FILL_SENSORS);
  Serial.println();

  delay(1000); // Give ESP32-CAM time to boot
}

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN LOOP
// ══════════════════════════════════════════════════════════════════════════════
void loop() {
  unsigned long now = millis();

  // ── M1: Check Trigger Sensor (item detection) ─────────────────────────────
  if (!sortingInProgress && (now - lastTriggerTime > TRIGGER_DEBOUNCE_MS)) {
    float distance = readUltrasonicCm(TRIGGER_TRIG_PIN, TRIGGER_ECHO_PIN);

    if (distance > 0 && distance < TRIGGER_DISTANCE_CM) {
      Serial.print(F("Item detected at "));
      Serial.print(distance, 1);
      Serial.println(F(" cm — sending TRIGGER to ESP32..."));

      lastTriggerTime = now;
      sortingInProgress = true;

      // Send TRIGGER command to ESP32-CAM
      espSerial.println("TRIGGER");

      // Now wait — ESP32 will capture, run ML, and send back SORT:<category>
      // The SORT command will be handled below in the serial listener
      sortingInProgress = false; // Reset — SORT handler will re-set if needed
    }
  }

  // ── Listen for serial commands from ESP32-CAM ─────────────────────────────
  if (espSerial.available()) {
    String command = espSerial.readStringUntil('\n');
    command.trim();

    if (command.startsWith("SORT:")) {
      handleSortCommand(command.substring(5));
    }
    else if (command == "READ_LEVELS") {
      handleReadLevels();
    }
    else if (command.length() > 0) {
      // Treat other messages as debug logs from ESP32 rather than errors
      Serial.print(F("ESP32 Log: "));
      Serial.println(command);
    }
  }

  // ── Auto-print fill levels to USB Serial Monitor ──────────────────────────
  // This runs regardless of ESP32 — useful for debugging with PC connected.
  // When on power bank with no PC, these prints just go nowhere (no cost).
  if (!sortingInProgress && (now - lastSerialMonitorTime > SERIAL_MONITOR_INTERVAL_MS)) {
    lastSerialMonitorTime = now;
    printFillLevelsToMonitor();
  }

  delay(50);
}

// ══════════════════════════════════════════════════════════════════════════════
//  M4 + M5: SORT COMMAND HANDLER
// ══════════════════════════════════════════════════════════════════════════════
/**
 * Handle a SORT command from ESP32-CAM.
 * 1. Rotate stepper to the target bin angle
 * 2. Open the servo flap
 * 3. Wait for item to fall through
 * 4. Close the flap
 * 5. Send ACK:SORTED back
 */
void handleSortCommand(String category) {
  sortingInProgress = true;

  Serial.print(F("Sorting item: "));
  Serial.println(category);

  // Find the target angle for this category
  int targetAngle = -1;
  for (int i = 0; i < NUM_BINS; i++) {
    if (category.equalsIgnoreCase(bins[i].name)) {
      targetAngle = bins[i].angle;
      break;
    }
  }

  if (targetAngle < 0) {
    Serial.print(F("ERROR: Unknown category: "));
    Serial.println(category);
    espSerial.println("ERR:UNKNOWN_CATEGORY");
    sortingInProgress = false;
    return;
  }

  // ── M4: Rotate stepper to target angle ────────────────────────────────────
  // Linear layout: no wrap-around needed, just move directly
  int angleDiff = targetAngle - currentAngle;

  if (angleDiff != 0) {
    long stepsToMove = (long)angleDiff * STEPS_PER_REV / 360;
    Serial.print(F("Stepper: "));
    Serial.print(currentAngle);
    Serial.print(F("deg -> "));
    Serial.print(targetAngle);
    Serial.print(F("deg ("));
    Serial.print(stepsToMove);
    Serial.println(F(" steps)"));

    stepper.step(stepsToMove);
    currentAngle = targetAngle;
  } else {
    Serial.println(F("Stepper: already at target angle"));
  }

  // De-energize stepper coils to save power and prevent overheating
  deEnergizeStepper();

  // ── M5: Open flap gate ────────────────────────────────────────────────────
  Serial.println(F("Opening flap..."));
  flapServo.write(FLAP_OPEN_DEG);
  delay(FLAP_HOLD_MS);

  // Close flap
  flapServo.write(FLAP_CLOSED_DEG);
  Serial.println(F("Flap closed. Sort complete."));

  // Send acknowledgment to ESP32-CAM
  espSerial.println("ACK:SORTED");

  sortingInProgress = false;
  lastTriggerTime = millis(); // Reset debounce timer after sort completes
}

// ══════════════════════════════════════════════════════════════════════════════
//  M6: FILL-LEVEL READING
// ══════════════════════════════════════════════════════════════════════════════
/**
 * Read all fill-level ultrasonic sensors and send data to ESP32-CAM.
 * Format: LEVELS:glass_cm,metal_cm,paper_plastic_cm
 * (3 sensors only — rejected bin has no sensor yet)
 */
void handleReadLevels() {
  Serial.println(F("Reading fill levels..."));

  float distances[3] = {50.0, 50.0, 50.0}; // Default = empty bin depth (50cm)

  for (int i = 0; i < NUM_FILL_SENSORS; i++) {
    float d = readUltrasonicCm(fillSensors[i].trigPin, fillSensors[i].echoPin);
    if (d > 0 && d < 200) {  // Sanity check: 0-200cm valid range
      distances[i] = d;
    }
    Serial.print(F("  "));
    Serial.print(fillSensors[i].label);
    Serial.print(F(": "));
    Serial.print(distances[i], 1);
    Serial.println(F(" cm"));
    delay(60); // Small delay between readings to prevent cross-talk
  }

  // Format response (3 values)
  String response = "LEVELS:";
  response += String(distances[0], 1) + ",";
  response += String(distances[1], 1) + ",";
  response += String(distances[2], 1);

  espSerial.println(response);
  Serial.print(F("Sent: "));
  Serial.println(response);
}

// ══════════════════════════════════════════════════════════════════════════════
//  SERIAL MONITOR: PERIODIC FILL-LEVEL DISPLAY
// ══════════════════════════════════════════════════════════════════════════════
/**
 * Print fill levels to USB Serial Monitor for debugging.
 * Shows distance in cm AND fill percentage (assumes 50cm bin depth).
 * This output only goes to the USB serial — NOT to ESP32.
 * When running on power bank with no PC, these prints are harmless.
 */
#define BIN_DEPTH_CM 50.0  // Adjust to your actual bin depth

void printFillLevelsToMonitor() {
  Serial.println(F("┌────────────────────────────────────────┐"));
  Serial.println(F("│        FILL LEVELS (Live)              │"));
  Serial.println(F("├────────────────┬──────────┬────────────┤"));
  Serial.println(F("│ Bin            │ Distance │ Fill %     │"));
  Serial.println(F("├────────────────┼──────────┼────────────┤"));

  for (int i = 0; i < NUM_FILL_SENSORS; i++) {
    float d = readUltrasonicCm(fillSensors[i].trigPin, fillSensors[i].echoPin);
    if (d <= 0 || d > 200) d = BIN_DEPTH_CM; // Treat invalid as empty

    // Calculate fill percentage: closer distance = more full
    float fillPct = 100.0 * (1.0 - (d / BIN_DEPTH_CM));
    if (fillPct < 0) fillPct = 0;
    if (fillPct > 100) fillPct = 100;

    // Print formatted row
    Serial.print(F("│ "));
    // Pad label to 15 chars
    String label = fillSensors[i].label;
    Serial.print(label);
    for (int p = label.length(); p < 15; p++) Serial.print(' ');

    Serial.print(F("│ "));
    if (d < 10) Serial.print(' ');
    Serial.print(d, 1);
    Serial.print(F(" cm  │ "));

    // Fill bar: ████░░░░ XX%
    int barFilled = (int)(fillPct / 10);
    for (int b = 0; b < 10; b++) {
      Serial.print(b < barFilled ? '#' : '-');
    }
    Serial.print(' ');
    if (fillPct < 10) Serial.print(' ');
    Serial.print((int)fillPct);
    Serial.println(F("% │"));

    delay(60); // Prevent ultrasonic cross-talk
  }

  // Rejected bin (no sensor)
  Serial.println(F("│ rejected       │   N/A    │ No sensor  │"));
  Serial.println(F("└────────────────┴──────────┴────────────┘"));
  Serial.println();
}

// ══════════════════════════════════════════════════════════════════════════════
//  UTILITY FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Read distance from an HC-SR04 ultrasonic sensor in centimeters.
 * Returns -1.0 if no echo received (timeout / out of range).
 */
float readUltrasonicCm(int trigPin, int echoPin) {
  // Ensure clean trigger pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Measure echo duration (30ms timeout ≈ 5m max range)
  long duration = pulseIn(echoPin, HIGH, 30000);
  if (duration == 0) return -1.0;

  // Speed of sound: 343 m/s → 0.0343 cm/µs → distance = (time × 0.0343) / 2
  return (duration * 0.0343) / 2.0;
}

/**
 * De-energize the stepper motor coils to prevent overheating.
 * The 28BYJ-48 draws ~240mA per phase when energized — leaving
 * coils on will overheat the motor and ULN2003 driver within minutes.
 * In this application, there's no holding torque requirement.
 */
void deEnergizeStepper() {
  digitalWrite(STEPPER_IN1, LOW);
  digitalWrite(STEPPER_IN2, LOW);
  digitalWrite(STEPPER_IN3, LOW);
  digitalWrite(STEPPER_IN4, LOW);
}
