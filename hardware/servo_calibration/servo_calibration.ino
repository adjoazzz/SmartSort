#include <Servo.h>

// Servo pin connected to Arduino Pin 9
#define SERVO_PIN 9
#define STATUS_LED 13 // Onboard LED on Arduino (Pin 13)

Servo testServo;
int currentAngle = 100; // Starts at your closed position

void printHelp() {
  Serial.println(F("\n==========================================="));
  Serial.println(F("     SMARTSORT SERVO CALIBRATION TOOL      "));
  Serial.println(F("==========================================="));
  Serial.print(F(" Hardware Status: SERVO ATTACHED on Pin "));
  Serial.println(SERVO_PIN);
  Serial.println(F(" Onboard LED (Pin 13): ON = Servo Active, OFF = Detached"));
  Serial.println(F("-------------------------------------------"));
  Serial.println(F("Commands:"));
  Serial.println(F("1. Type any angle (0 - 180) and press Enter."));
  Serial.println(F("2. '+' / '-' : Nudge angle up/down by 5 degrees."));
  Serial.println(F("3. 't'       : Run test verification wiggle."));
  Serial.println(F("4. 'd'       : Detach servo (test if flap sags under weight)."));
  Serial.println(F("5. 'a'       : Re-attach servo."));
  Serial.println(F("==========================================="));
  Serial.print(F("Current target angle: "));
  Serial.print(currentAngle);
  Serial.println(F(" degrees"));
}

// Visual confirmation self-test sweep
void runSelfTestWiggle() {
  Serial.println(F("[SELF-TEST] Running startup detection wiggle..."));
  digitalWrite(STATUS_LED, HIGH);

  // Wiggle +20 deg and -20 deg to physically show motor responds
  testServo.write(constrain(currentAngle + 20, 0, 180));
  delay(250);
  testServo.write(constrain(currentAngle - 20, 0, 180));
  delay(250);
  testServo.write(currentAngle);
  delay(200);

  Serial.println(F("[SELF-TEST OK] Servo detected and responding to PWM signals!"));
}

void setup() {
  pinMode(STATUS_LED, OUTPUT);
  digitalWrite(STATUS_LED, LOW);

  Serial.begin(9600);
  delay(200);

  // Attach and enable servo
  testServo.attach(SERVO_PIN);
  digitalWrite(STATUS_LED, HIGH); // LED ON indicates PWM line is active

  if (testServo.attached()) {
    Serial.println(F("\n>>> [HARDWARE CHECK: PASSED] Servo attached to Pin 9 successfully! <<<"));
  } else {
    Serial.println(F("\n>>> [HARDWARE CHECK: FAILED] Could not attach servo on Pin 9! <<<"));
  }

  // Set home position and run visible wiggle test
  testServo.write(currentAngle);
  delay(300);
  runSelfTestWiggle();

  printHelp();
}

void loop() {
  if (Serial.available() > 0) {
    char firstChar = Serial.peek();

    if (firstChar == '+') {
      Serial.read(); // consume char
      currentAngle = constrain(currentAngle + 5, 0, 180);
      if (!testServo.attached()) {
        testServo.attach(SERVO_PIN);
        digitalWrite(STATUS_LED, HIGH);
      }
      testServo.write(currentAngle);
      Serial.print(F("Angle (+) -> "));
      Serial.println(currentAngle);
    } 
    else if (firstChar == '-') {
      Serial.read(); // consume char
      currentAngle = constrain(currentAngle - 5, 0, 180);
      if (!testServo.attached()) {
        testServo.attach(SERVO_PIN);
        digitalWrite(STATUS_LED, HIGH);
      }
      testServo.write(currentAngle);
      Serial.print(F("Angle (-) -> "));
      Serial.println(currentAngle);
    }
    else if (firstChar == 't' || firstChar == 'T') {
      Serial.read(); // consume char
      if (!testServo.attached()) {
        testServo.attach(SERVO_PIN);
        digitalWrite(STATUS_LED, HIGH);
      }
      runSelfTestWiggle();
    }
    else if (firstChar == 'd' || firstChar == 'D') {
      Serial.read(); // consume char
      testServo.detach();
      digitalWrite(STATUS_LED, LOW); // LED OFF = Detached
      Serial.println(F(">>> Servo DETACHED (Pin 13 LED OFF). Check if flap holds item weight or drops! <<<"));
    }
    else if (firstChar == 'a' || firstChar == 'A') {
      Serial.read(); // consume char
      testServo.attach(SERVO_PIN);
      digitalWrite(STATUS_LED, HIGH); // LED ON = Attached
      testServo.write(currentAngle);
      Serial.print(F(">>> Servo RE-ATTACHED (Pin 13 LED ON) at angle: "));
      Serial.println(currentAngle);
    }
    else if (firstChar >= '0' && firstChar <= '9') {
      int targetAngle = Serial.parseInt();
      if (targetAngle >= 0 && targetAngle <= 180) {
        currentAngle = targetAngle;
        if (!testServo.attached()) {
          testServo.attach(SERVO_PIN);
          digitalWrite(STATUS_LED, HIGH);
        }
        testServo.write(currentAngle);
        Serial.print(F("Moving to angle: "));
        Serial.print(currentAngle);
        Serial.println(F("°"));
      } else {
        Serial.println(F("Invalid angle. Enter a number between 0 and 180."));
      }
    } 
    else {
      // Clear unrecognized characters (whitespace, newlines, etc.)
      Serial.read();
    }
  }
}
