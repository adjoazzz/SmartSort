#include <SoftwareSerial.h>
#include <Stepper.h>
#include <Servo.h>

// Communication with ESP32-CAM
SoftwareSerial espSerial(10, 11); // RX, TX

// Trigger Sensor (Landing Zone)
#define TRIG_PIN 4
#define ECHO_PIN 12
#define TRIGGER_DISTANCE_CM 5.0

// Fill Sensor #1 (Glass Bin)
#define FILL1_TRIG A0
#define FILL1_ECHO A1

// Fill Sensor #2 (Metal Bin)
#define FILL2_TRIG A2
#define FILL2_ECHO A3

// Fill Sensor #3 (Paper/Plastic Bin)
#define FILL3_TRIG 2
#define FILL3_ECHO 3

// Fill Sensor #4 (Rejected Waste Bin)
#define FILL4_TRIG A4
#define FILL4_ECHO A5

// Stepper Motor (28BYJ-48 via ULN2003)
#define STEPS_PER_REV 2048
#define STEPPER_IN1 8
#define STEPPER_IN2 7
#define STEPPER_IN3 6
#define STEPPER_IN4 5
#define STEPPER_SPEED 12           // RPM
#define HOME_ANGLE 90              // Resting/home position in degrees
#define STEPPER_MOVE_DELAY_MS 4000 // 4-second delay between stepper movements

Stepper stepper(STEPS_PER_REV, STEPPER_IN1, STEPPER_IN3, STEPPER_IN2, STEPPER_IN4);
int currentAngle = HOME_ANGLE; // Track the current position of the deflector

// SG90 Servo Flap
Servo flapServo;
#define SERVO_PIN 9
#define FLAP_CLOSED_DEG 0 // Angle when holding the item
#define FLAP_OPEN_DEG 90  // Angle to drop the item
#define FLAP_HOLD_MS 2000 // How long to hold the flap open (2 seconds)

unsigned long lastTriggerTime = 0;

void setup()
{
  lastTriggerTime = millis() - 5000UL; // Expire the cooldown so it can trigger immediately!
  Serial.begin(9600);                  // To PC
  espSerial.begin(9600);               // To ESP32-CAM

  // Setup sensors
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  pinMode(FILL1_TRIG, OUTPUT);
  pinMode(FILL1_ECHO, INPUT);
  pinMode(FILL2_TRIG, OUTPUT);
  pinMode(FILL2_ECHO, INPUT);
  pinMode(FILL3_TRIG, OUTPUT);
  pinMode(FILL3_ECHO, INPUT);
  pinMode(FILL4_TRIG, OUTPUT);
  pinMode(FILL4_ECHO, INPUT);

  // Setup Motors
  stepper.setSpeed(STEPPER_SPEED);
  currentAngle = HOME_ANGLE; // Explicit starting home angle (90 degrees)

  // Ensure stepper coils start de-energized (cool & idle)
  digitalWrite(STEPPER_IN1, LOW);
  digitalWrite(STEPPER_IN2, LOW);
  digitalWrite(STEPPER_IN3, LOW);
  digitalWrite(STEPPER_IN4, LOW);

  flapServo.attach(SERVO_PIN);
  flapServo.write(FLAP_CLOSED_DEG); // Ensure it starts closed
  delay(500);
  flapServo.detach(); // Detach to prevent twitching when idle

  Serial.println("Arduino Ready: Chute Home Position calibrated at 90 degrees!");
  Serial.println("Sensors, Stepper, and Servo active and waiting for items.");
}

void loop()
{
  unsigned long now = millis();

  // 1. Check Trigger Sensor
  float distance = readUltrasonicCm(TRIG_PIN, ECHO_PIN);
  if (distance > 0 && distance < TRIGGER_DISTANCE_CM && (now - lastTriggerTime > 5000))
  {
    Serial.print("Item detected! Sending TRIGGER... ");
    espSerial.println("TRIGGER");
    lastTriggerTime = now; // Prevent multiple triggers in a row
  }

  // 2. Listen for ESP32-CAM commands
  if (espSerial.available())
  {
    String incoming = espSerial.readStringUntil('\n');
    incoming.trim();

    if (incoming.startsWith("SORT:"))
    {
      String category = incoming.substring(5);
      Serial.println("✅ ML predicted: " + category);

      // Handle the full routing and dropping sequence
      handleSortCommand(category);
    }
    else if (incoming == "READ_LEVELS")
    {
      float glassDist = readUltrasonicCm(FILL1_TRIG, FILL1_ECHO);
      if (glassDist <= 0 || glassDist > 200)
        glassDist = 50.0;

      float metalDist = readUltrasonicCm(FILL2_TRIG, FILL2_ECHO);
      if (metalDist <= 0 || metalDist > 200)
        metalDist = 50.0;

      float paperDist = readUltrasonicCm(FILL3_TRIG, FILL3_ECHO);
      if (paperDist <= 0 || paperDist > 200)
        paperDist = 50.0;

      float rejectedDist = readUltrasonicCm(FILL4_TRIG, FILL4_ECHO);
      if (rejectedDist <= 0 || rejectedDist > 200)
        rejectedDist = 50.0;

      String response = "LEVELS:" + String(glassDist, 1) + "," + String(metalDist, 1) + "," + String(paperDist, 1) + "," + String(rejectedDist, 1);
      espSerial.println(response);

      // Print to Serial Monitor so you can see it too
      Serial.print("Fill levels (cm) - Glass: ");
      Serial.print(glassDist);
      Serial.print(", Metal: ");
      Serial.print(metalDist);
      Serial.print(", Paper/Plastic: ");
      Serial.print(paperDist);
      Serial.print(", Rejected: ");
      Serial.println(rejectedDist);
    }
  }

  delay(50);
}

// Moves stepper, drops item, and resets
void handleSortCommand(String category)
{
  int targetAngle = -1; // -1 means unrecognized

  if (category.equalsIgnoreCase("glass"))
    targetAngle = 0;
  else if (category.equalsIgnoreCase("metal"))
    targetAngle = 45;
  else if (category.equalsIgnoreCase("paper") || category.equalsIgnoreCase("plastic"))
    targetAngle = 90;
  else if (category.equalsIgnoreCase("rejected_waste"))
    targetAngle = 135;

  if (targetAngle == -1)
  {
    Serial.println("ERROR: Unrecognized category: " + category);
    espSerial.println("ERR:UNKNOWN_CATEGORY");
    return; // Abort the sorting motion!
  }

  int angleDiff = targetAngle - currentAngle;

  // 1. Move Stepper to the correct bin
  if (angleDiff != 0)
  {
    long stepsToMove = (long)angleDiff * STEPS_PER_REV / 360;
    Serial.print("Routing chute to ");
    Serial.print(targetAngle);
    Serial.println(" degrees...");

    stepper.step(stepsToMove);
    currentAngle = targetAngle;
  }
  else
  {
    Serial.println("Already at correct bin.");
  }

  // Turn off stepper coils to prevent heat
  digitalWrite(STEPPER_IN1, LOW);
  digitalWrite(STEPPER_IN2, LOW);
  digitalWrite(STEPPER_IN3, LOW);
  digitalWrite(STEPPER_IN4, LOW);

  // Delay 4 seconds after stepper arrives at bin before opening flap
  Serial.println("Waiting 4s before dropping item...");
  delay(STEPPER_MOVE_DELAY_MS);

  // 2. Open the Flap to drop the item!
  Serial.println("Opening flap...");
  flapServo.attach(SERVO_PIN);
  flapServo.write(FLAP_OPEN_DEG);

  delay(FLAP_HOLD_MS); // Wait for item to fall

  // 3. Close the Flap
  flapServo.write(FLAP_CLOSED_DEG);
  Serial.println("Flap closed.");
  delay(500);         // Wait for it to physically return to closed position
  flapServo.detach(); // Detach to prevent twitching when idle

  // Delay 4 seconds after flap closes before returning stepper home
  Serial.println("Waiting 4s before returning chute home...");
  delay(STEPPER_MOVE_DELAY_MS);

  // 4. Return Stepper to Home (90 degrees)
  if (currentAngle != HOME_ANGLE)
  {
    long stepsToHome = (long)(HOME_ANGLE - currentAngle) * STEPS_PER_REV / 360;
    Serial.print("Returning chute to home (");
    Serial.print(HOME_ANGLE);
    Serial.println(" degrees)...");
    stepper.step(stepsToHome);
    currentAngle = HOME_ANGLE;

    // Turn off stepper coils to prevent heat
    digitalWrite(STEPPER_IN1, LOW);
    digitalWrite(STEPPER_IN2, LOW);
    digitalWrite(STEPPER_IN3, LOW);
    digitalWrite(STEPPER_IN4, LOW);
  }

  // 5. Tell ESP32 we are done
  Serial.println("Sort Complete! Ready for next item.");
  espSerial.println("ACK:SORTED");
}

// Helper to read distance in cm
float readUltrasonicCm(int trigPin, int echoPin)
{
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH, 30000);
  if (duration == 0)
    return -1.0;
  return (duration * 0.0343) / 2.0;
}
