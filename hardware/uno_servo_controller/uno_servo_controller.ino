#include <Servo.h>
#include <SoftwareSerial.h>
#include <Stepper.h>

// ==========================================
// Communication
// ==========================================
// RX = Pin 10, TX = Pin 11 (TX is used to send fill levels to ESP32)
SoftwareSerial espSerial(10, 11);

// ==========================================
// Flap Servo
// ==========================================
Servo flapServo;
const int flapServoPin = 9;
const int FLAP_CLOSED_ANGLE = 0;
const int FLAP_OPEN_ANGLE = 90;

// ==========================================
// Route Stepper Motor (28BYJ-48)
// ==========================================
// Steps per revolution for 28BYJ-48 is usually 2048
const int stepsPerRevolution = 2048; 
// Initialize the stepper library on pins 4 through 7:
// For a ULN2003 driver, the sequence is IN1, IN3, IN2, IN4. 
// Assuming you wired: Arduino Pin 4 -> IN1, Pin 5 -> IN2, Pin 6 -> IN3, Pin 7 -> IN4
Stepper routeStepper(stepsPerRevolution, 4, 6, 5, 7); 

// Target steps from center (Home) position. 
// Note: You will need to tune these step counts to match your physical bins.
// 2048 steps = 360 degrees. 512 steps = 90 degrees.
const int STEPS_GLASS          = -512;  // Example: 90 degrees left
const int STEPS_METAL          = -256;  // Example: 45 degrees left
const int STEPS_PAPER_PLASTIC  = 0;     // Example: Center
const int STEPS_REJECTED       = 256;   // Example: 45 degrees right

// ==========================================
// Ultrasonic Sensors (Bin Fill Levels)
// ==========================================
// Bin 1: Glass
const int TRIG_1 = 2;
const int ECHO_1 = 3;
// Bin 2: Metal
const int TRIG_2 = 12;
const int ECHO_2 = 13;
// Bin 3: Paper/Plastic
const int TRIG_3 = A0;
const int ECHO_3 = A1;
// Bin 4: Rejected
const int TRIG_4 = A2;
const int ECHO_4 = A3;

unsigned long lastSensorReadTime = 0;
const unsigned long SENSOR_READ_INTERVAL = 5000; // Read every 5 seconds

void setup() {
  // Start Hardware Serial for debugging on PC
  Serial.begin(9600);
  
  // Start SoftwareSerial to talk with ESP32 (Ensure ESP32 matches this baud rate)
  espSerial.begin(9600); // Changed to 9600 for reliability with SoftwareSerial
  
  // Setup Flap Servo
  flapServo.attach(flapServoPin);
  flapServo.write(FLAP_CLOSED_ANGLE);
  
  // Setup Stepper Speed (RPM)
  routeStepper.setSpeed(15); 
  
  // Setup Ultrasonic Pins
  pinMode(TRIG_1, OUTPUT); pinMode(ECHO_1, INPUT);
  pinMode(TRIG_2, OUTPUT); pinMode(ECHO_2, INPUT);
  pinMode(TRIG_3, OUTPUT); pinMode(ECHO_3, INPUT);
  pinMode(TRIG_4, OUTPUT); pinMode(ECHO_4, INPUT);

  Serial.println("SmartSort Uno Controller Ready");
  Serial.println("Waiting for commands from ESP32...");
}

void loop() {
  // 1. Check for commands from ESP32
  if (espSerial.available()) {
    char cmd = espSerial.read();
    
    // Ignore newlines and carriage returns
    if (cmd == '\n' || cmd == '\r') {
      return;
    }
    
    Serial.print("Received command: ");
    Serial.println(cmd);
    
    int targetSteps = 0;
    bool validCommand = true;

    switch(cmd) {
      case 'G': Serial.println("Routing: Glass");           targetSteps = STEPS_GLASS; break;
      case 'M': Serial.println("Routing: Metal");           targetSteps = STEPS_METAL; break;
      case 'P': Serial.println("Routing: Paper/Plastic");   targetSteps = STEPS_PAPER_PLASTIC; break;
      case 'L': Serial.println("Routing: Paper/Plastic");   targetSteps = STEPS_PAPER_PLASTIC; break;
      case 'R': Serial.println("Routing: Rejected");        targetSteps = STEPS_REJECTED; break;
      default:
        Serial.println("Unknown command, ignoring.");
        validCommand = false;
        break;
    }

    if (validCommand) {
      // 1. Move route chute to target bin
      Serial.println("Moving stepper to bin...");
      routeStepper.step(targetSteps);
      
      // 2. Open flap to drop item
      Serial.println("Opening flap...");
      flapServo.write(FLAP_OPEN_ANGLE);
      delay(2000); // Wait for item to slide down
      
      // 3. Close flap
      Serial.println("Closing flap...");
      flapServo.write(FLAP_CLOSED_ANGLE);
      delay(500);
      
      // 4. Return route chute to center (Home)
      Serial.println("Returning stepper to center...");
      routeStepper.step(-targetSteps); // Move back the exact same number of steps
      
      Serial.println("Ready for next item.");
    }
  }

  // 2. Periodically read fill levels and send to ESP32
  if (millis() - lastSensorReadTime >= SENSOR_READ_INTERVAL) {
    lastSensorReadTime = millis();
    
    int dist1 = readDistance(TRIG_1, ECHO_1);
    int dist2 = readDistance(TRIG_2, ECHO_2);
    int dist3 = readDistance(TRIG_3, ECHO_3);
    int dist4 = readDistance(TRIG_4, ECHO_4);
    
    // Format: F:<glass>,<metal>,<paper_plastic>,<rejected>\n
    // We send distance in cm. The backend will calculate percentage based on bin depth.
    String fillData = "F:" + String(dist1) + "," + String(dist2) + "," + 
                      String(dist3) + "," + String(dist4) + "\n";
    
    // Send to ESP32
    espSerial.print(fillData);
    
    // Print to Serial monitor for debugging
    Serial.print("Sent Fill Levels: ");
    Serial.print(fillData);
  }
}

// Function to read distance from an HC-SR04 sensor in cm
int readDistance(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  long duration = pulseIn(echoPin, HIGH, 30000); // 30ms timeout (~5m)
  
  if (duration == 0) {
    return 999; // Error or out of range
  }
  
  // Calculate distance in cm (speed of sound is 343m/s)
  int distance = duration * 0.034 / 2;
  return distance;
}
