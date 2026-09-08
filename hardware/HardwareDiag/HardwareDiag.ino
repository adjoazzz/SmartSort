#include <Servo.h>
#include <Stepper.h>

// --- PIN DEFINITIONS ---
#define STEPPER_IN1 8
#define STEPPER_IN3 7
#define STEPPER_IN2 6
#define STEPPER_IN4 5

#define SERVO_PIN 9
#define STEPS_PER_REV 2048

// Try sequential firing order:
Stepper stepper(STEPS_PER_REV, STEPPER_IN1, STEPPER_IN2, STEPPER_IN3, STEPPER_IN4);
Servo flapServo;

void setup() {
  Serial.begin(9600);
  while (!Serial) { ; } 
  
  Serial.println("==========================================");
  Serial.println("     MOTOR CONTINUOUS DIAGNOSTIC TOOL     ");
  Serial.println("==========================================");
  
  stepper.setSpeed(12); // 12 RPM
}

void loop() {
  // --- 1. SERVO TEST ---
  Serial.println("\n[1] Sweeping Servo: FULL OPEN to FULL CLOSE");
  flapServo.attach(SERVO_PIN);
  flapServo.write(100);  // Close
  delay(1000);
  flapServo.write(20);  // Open wide (Flap DOWN)
  delay(1000);
  flapServo.write(100);  // Close
  delay(500);
  flapServo.detach();
  
  // --- 2. STEPPER TEST ---
  Serial.println("[2] Spinning Stepper: Clockwise...");
  stepper.step(512); // Quarter turn clockwise
  delay(500);
  
  Serial.println("[3] Spinning Stepper: Counter-Clockwise...");
  stepper.step(-512); // Quarter turn counter-clockwise
  
  // Turn off stepper coils to prevent heat
  digitalWrite(STEPPER_IN1, LOW);
  digitalWrite(STEPPER_IN2, LOW);
  digitalWrite(STEPPER_IN3, LOW);
  digitalWrite(STEPPER_IN4, LOW);
  
  Serial.println("Cycle Complete. Repeating in 3 seconds...");
  delay(3000);
}
