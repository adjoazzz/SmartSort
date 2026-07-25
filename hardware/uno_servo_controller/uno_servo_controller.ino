#include <Servo.h>
#include <SoftwareSerial.h>

// Initialize Servos
Servo routeServo;

const int routeServoPin = 9;

// Initialize SoftwareSerial for receiving from ESP32
// RX = Pin 10, TX = Pin 11 (TX not used/connected)
SoftwareSerial espSerial(10, 11);

// Define angles for Route Servo (Chute)
const int ROUTE_CENTER = 90;
const int ROUTE_GLASS = 30;
const int ROUTE_METAL = 60;
const int ROUTE_PAPER = 120;
const int ROUTE_PLASTIC = 150;
const int ROUTE_REJECTED = 180;

void setup() {
  // Start Hardware Serial for debugging on PC
  Serial.begin(9600);
  
  // Start SoftwareSerial to talk with ESP32
  // We assume ESP32 Serial.begin is 115200. 
  espSerial.begin(115200); 

  // Attach servos
  routeServo.attach(routeServoPin);
  
  // Set initial positions
  routeServo.write(ROUTE_CENTER);

  Serial.println("SmartSort Uno Dual-Servo Controller Ready");
  Serial.println("Waiting for commands from ESP32...");
}

void loop() {
  // Check if ESP32 sent any character
  if (espSerial.available()) {
    char cmd = espSerial.read();
    
    // Ignore newlines and carriage returns
    if (cmd == '\n' || cmd == '\r') {
      return;
    }
    
    Serial.print("Received command: ");
    Serial.println(cmd);
    
    int targetRouteAngle = ROUTE_CENTER;

    switch(cmd) {
      case 'G':
        Serial.println("Category: Glass");
        targetRouteAngle = ROUTE_GLASS;
        break;
      case 'M':
        Serial.println("Category: Metal");
        targetRouteAngle = ROUTE_METAL;
        break;
      case 'P':
        Serial.println("Category: Paper");
        targetRouteAngle = ROUTE_PAPER;
        break;
      case 'L':
        Serial.println("Category: Plastic");
        targetRouteAngle = ROUTE_PLASTIC;
        break;
      case 'R':
        Serial.println("Category: Rejected Waste");
        targetRouteAngle = ROUTE_REJECTED;
        break;
      default:
        Serial.println("Unknown command, staying centered.");
        targetRouteAngle = ROUTE_CENTER;
        break;
    }

    if (targetRouteAngle != ROUTE_CENTER) {
      // 1. Move route chute to target bin
      Serial.println("Moving route servo...");
      routeServo.write(targetRouteAngle);
      
      // 2. Wait for item to slide down the chute
      delay(3000); 
      
      // 3. Return route chute to center for next item
      routeServo.write(ROUTE_CENTER);
      Serial.println("Returned route chute to center");
    }
  }
}
