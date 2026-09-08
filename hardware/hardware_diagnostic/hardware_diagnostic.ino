#include <Servo.h>
#include <SoftwareSerial.h>
#include <Stepper.h>

// Communication with ESP32-CAM
SoftwareSerial espSerial(10, 11); // RX, TX

// Trigger Sensor
#define TRIG_PIN 4
#define ECHO_PIN 12

// Fill Sensors
#define FILL1_TRIG A0
#define FILL1_ECHO A1
#define FILL2_TRIG A2
#define FILL2_ECHO A3
#define FILL3_TRIG 2
#define FILL3_ECHO 3
#define FILL4_TRIG A4
#define FILL4_ECHO A5

// Stepper Motor
#define STEPS_PER_REV 2048
#define STEPPER_IN1 8
#define STEPPER_IN2 7
#define STEPPER_IN3 6
#define STEPPER_IN4 5
Stepper stepper(STEPS_PER_REV, STEPPER_IN1, STEPPER_IN3, STEPPER_IN2, STEPPER_IN4);

// Servo
Servo flapServo;
#define SERVO_PIN 9

void setup() {
  Serial.begin(9600);
  espSerial.begin(9600);

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

  stepper.setSpeed(12);

  Serial.println("\n==================================");
  Serial.println("  HARDWARE DIAGNOSTIC STARTING");
  Serial.println("==================================");
}

float measureSensor(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH, 30000); // 30ms timeout
  if (duration == 0) return 0.0; // Timeout / Not wired correctly
  return duration * 0.034 / 2.0;
}

void loop() {
  Serial.println("\n--- RUNNING COMPONENT TEST ---");

  // 1. Test Ultrasonic Sensors
  Serial.println("\n1. Testing Ultrasonic Sensors (Target should be > 0.0 cm):");
  
  float trigDist = measureSensor(TRIG_PIN, ECHO_PIN);
  Serial.print("   -> Landing Zone Sensor : "); Serial.print(trigDist); Serial.println(" cm");
  
  float f1 = measureSensor(FILL1_TRIG, FILL1_ECHO);
  Serial.print("   -> Glass Fill Sensor   : "); Serial.print(f1); Serial.println(" cm");
  
  float f2 = measureSensor(FILL2_TRIG, FILL2_ECHO);
  Serial.print("   -> Metal Fill Sensor   : "); Serial.print(f2); Serial.println(" cm");
  
  float f3 = measureSensor(FILL3_TRIG, FILL3_ECHO);
  Serial.print("   -> Paper Fill Sensor   : "); Serial.print(f3); Serial.println(" cm");
  
  float f4 = measureSensor(FILL4_TRIG, FILL4_ECHO);
  Serial.print("   -> Reject Fill Sensor  : "); Serial.print(f4); Serial.println(" cm");

  // 2. Test Servo
  Serial.println("\n2. Testing Servo Motor:");
  flapServo.attach(SERVO_PIN);
  flapServo.write(0);
  delay(1000);
  flapServo.write(110);
  delay(1000);
  flapServo.detach();
  Serial.println("   -> Servo sweep completed.");

  // 3. Test Stepper
  Serial.println("\n3. Testing Stepper Motor:");
  stepper.step(512);  // Quarter turn forward
  stepper.step(-512); // Quarter turn backward
  
  // Turn off stepper to prevent heat
  digitalWrite(STEPPER_IN1, LOW);
  digitalWrite(STEPPER_IN2, LOW);
  digitalWrite(STEPPER_IN3, LOW);
  digitalWrite(STEPPER_IN4, LOW);
  Serial.println("   -> Stepper rotation completed.");

  // 4. Test ESP32 Comm
  Serial.println("\n4. Testing ESP32 Communication:");
  espSerial.println("DIAGNOSTIC_PING");
  Serial.println("   -> Sent PING to ESP32. Waiting 2 seconds for any response...");
  
  unsigned long startWait = millis();
  bool gotResponse = false;
  while(millis() - startWait < 2000) {
    if(espSerial.available()) {
      String resp = espSerial.readStringUntil('\n');
      Serial.print("   -> ESP32 REPLIED: ");
      Serial.println(resp);
      gotResponse = true;
    }
  }
  if(!gotResponse) {
    Serial.println("   -> No response from ESP32.");
  }

  Serial.println("\n--- TEST CYCLE COMPLETE (Restarting in 10s) ---");
  delay(10000);
}
