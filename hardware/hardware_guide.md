# SmartSort Hardware Integration Guide

This guide walks you through the hardware assembly and wiring of the ESP32-CAM, Arduino Uno, HC-SR04 Ultrasonic Sensor, and the TWO Servo motors (one for the rotating chute, one for the landing zone flap).

## Components Needed
1. **ESP32-CAM Module** + **MB Programmer** (for easy USB connection and power).
2. **Arduino Uno R3**.
3. **HC-SR04 Ultrasonic Sensor**.
4. **Servo Motor 1 (Route Servo)** (e.g., SG90 or MG995) to rotate the chute.
5. **Servo Motor 2 (Flap Servo)** (SG90) to open the landing zone.
6. **Jumper Wires** (Male-to-Male, Female-to-Female).
7. **5V External Power Supply** (Recommended since you now have 2 servos. If using small SG90s, the Uno might barely power both, but an external 5V supply sharing a common ground with the Uno is highly recommended).

## 1. Wiring the ESP32-CAM & Ultrasonic Sensor (HC-SR04)
The ESP32-CAM takes pictures and handles the distance trigger. 

| HC-SR04 Pin | ESP32-CAM Pin | Notes |
| :--- | :--- | :--- |
| **VCC** | **5V / VCC** | The HC-SR04 works best at 5V. You can pull 5V from the MB Programmer or the ESP32-CAM's 5V pin. |
| **GND** | **GND** | Connect to any Ground on the ESP32. |
| **TRIG** | **GPIO 13** | Sends the ultrasonic pulse. |
| **ECHO** | **GPIO 12** | Reads the returning pulse. |

> **WARNING**: Do not use a micro SD card in the ESP32-CAM while using GPIO 12 and 13, as they share the SD card data lines.

## 2. Wiring ESP32-CAM to Arduino Uno (Serial Communication)
The ESP32-CAM needs to tell the Arduino Uno which bin category was detected.

| ESP32-CAM Pin | Arduino Uno Pin | Notes |
| :--- | :--- | :--- |
| **U0TXD (GPIO 1)** | **RX (Pin 10)** | We will use **SoftwareSerial on Pin 10** for the Uno. Connect ESP32 TX to Uno Pin 10. |
| **GND** | **GND** | **CRITICAL:** You must connect the Ground of the ESP32 to the Ground of the Arduino Uno so they share a common reference voltage! |

## 3. Wiring Arduino Uno to the Servo Motors
The Arduino Uno drives the route chute and the landing zone flap.

| Component / Pin | Arduino Uno Pin | Notes |
| :--- | :--- | :--- |
| **Route Servo VCC** | **5V** | External 5V highly recommended. |
| **Route Servo GND** | **GND** | Connect to Arduino GND. |
| **Route Servo Signal** | **Digital Pin 9** | Rotates the chute to the correct bin. |
| **Flap Servo VCC** | **5V** | External 5V highly recommended. |
| **Flap Servo GND** | **GND** | Connect to Arduino GND. |
| **Flap Servo Signal** | **Digital Pin 8** | Opens the landing zone to drop the trash. |

## 4. Sequence of Operation
1. Trash lands in the **landing zone** (flap is currently closed).
2. HC-SR04 distance drops below 10cm, detecting the trash.
3. ESP32 waits 1.5 seconds for the item to settle.
4. ESP32 takes a picture and sends it over WiFi to `http://<your-pc-ip>:5001/predict`.
5. The ML backend returns a class prediction (e.g., `plastic`).
6. ESP32 parses this and sends a character (e.g., `'L'`) over the TX pin.
7. Arduino Uno receives `'L'` on Pin 10.
8. Arduino Uno moves the **Route Servo** (Pin 9) to `120 degrees` (the plastic bin angle).
9. Arduino waits 1 second for the chute to finish moving into position.
10. Arduino moves the **Flap Servo** (Pin 8) to `90 degrees` to open the landing zone, dropping the trash into the chute.
11. Arduino waits 2 seconds for the trash to slide down.
12. Arduino closes the **Flap Servo** (returns to `0 degrees`).
13. Arduino returns the **Route Servo** to the center (`90 degrees`) for the next item.
