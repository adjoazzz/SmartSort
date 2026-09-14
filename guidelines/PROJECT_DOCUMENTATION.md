# SmartSort: An AI-Powered Automated Waste Classification and Routing System
**Final Year Project / Thesis Documentation**

---

## 1. Abstract & Introduction
The increasing volume of municipal solid waste demands highly efficient sorting mechanisms at the source. The **SmartSort** system proposes an automated, AI-driven garbage bin that eliminates human error in waste segregation. By utilizing a dual-microcontroller edge architecture combined with a localized Machine Learning server and web-based telemetry, the system dynamically identifies and physically routes waste into distinct categories: Glass, Metal, Paper/Plastic, and Rejected Waste. 

---

## 2. System Architecture Topology
The architecture is heavily decoupled to isolate hardware constraints from computational bottlenecks. It operates across three distinct layers:

1. **The Edge Layer (Hardware Control)**: An Arduino Uno manages real-time sensor polling and motor actuation.
2. **The Perception Layer (Vision & Networking)**: An ESP32-CAM captures visual data and acts as a Wi-Fi bridge.
3. **The Inference & Telemetry Layer (Server)**: A local Python Flask server runs a TensorFlow Lite model for classification, while a Node.js backend handles dashboard telemetry.

---

## 3. Hardware Implementation & Justification

### 3.1 Microcontroller Selection (The Dual-Brain Approach)
A single ESP32-CAM lacks sufficient GPIO pins to drive five ultrasonic sensors, a stepper motor, and a servo motor simultaneously. Therefore, the processing load is split:
* **Arduino Uno**: Acts as the physical controller. It provides exactly enough digital and analog pins to manage the 4 Fill-Level sensors, 1 Trigger sensor, the ULN2003 Stepper Driver, and the SG90 Servo. 
* **ESP32-CAM**: Dedicated purely to camera interfacing and 2.4GHz Wi-Fi transmission. It communicates with the Arduino via a SoftwareSerial UART connection (`RX: Pin 10, TX: Pin 11`).

### 3.2 Power Delivery Subsystem
Motor startup spikes (stall currents) and Wi-Fi transmission bursts cause massive voltage drops (brownouts). To prevent the ESP32 and Arduino from continuously rebooting, a **Dual Power Architecture** was designed:
* The **Arduino Logic** is powered cleanly via a dedicated 5V USB connection.
* The **High-Current Peripherals** (ESP32, Servo, Stepper, and Sensors) are powered by a high-capacity 5V Power Bank routed through isolated breadboard rails. 
* A **Common Ground** wire bridges the two power supplies, allowing the logic-level signals to share a reference voltage without cross-feeding the 5V positive rails.

### 3.3 Pinout Mapping (Arduino Uno)
| Component | Pin(s) Used | Purpose |
| :--- | :--- | :--- |
| **Trigger Sensor** | D4 (Trig), D12 (Echo) | Detects items dropped into the chute. |
| **Fill Sensor 1 (Glass)** | A0 (Trig), A1 (Echo) | Measures capacity of Glass bin. |
| **Fill Sensor 2 (Metal)** | A2 (Trig), A3 (Echo) | Measures capacity of Metal bin. |
| **Fill Sensor 3 (Paper)** | D2 (Trig), D3 (Echo) | Measures capacity of Paper bin. |
| **Fill Sensor 4 (Reject)** | A4 (Trig), A5 (Echo) | Measures capacity of Reject bin. |
| **ESP32 Serial (RX/TX)** | D10, D11 | SoftwareSerial UART communication. |
| **Stepper Motor** | D8, D7, D6, D5 | Drives the ULN2003 for the routing chute. |
| **Servo Motor** | D9 | Actuates the trapdoor flap. |

---

## 4. Software Engineering & Algorithmic Logic

### 4.1 Stateful Mechanical Homing via EEPROM
Stepper motors lack absolute positional awareness. If power is lost mid-rotation, the system forgets where the routing chute is pointing. To solve this, the Arduino utilizes non-volatile **EEPROM memory**.
* Every time the stepper motor finishes a movement, its exact mathematical angle is written to `EEPROM_ANGLE_ADDR`.
* Upon a cold boot, the Arduino reads this memory address. If the value deviates from `0.0` degrees, it automatically executes a reverse homing sequence to physically realign the chute before accepting new items.

### 4.2 Non-Blocking Concurrency
To ensure the system remains responsive, `delay()` functions are strictly minimized outside of physical actuation. The ESP32 utilizes a non-blocking `millis()` timer to ping the Arduino for fill-levels exactly every 30,000 milliseconds (30 seconds) without halting the camera listening loop.

### 4.3 AI Image Preprocessing & Tensor Preservation
The ESP32-CAM captures raw JPEG images in a 4:3 rectangular aspect ratio. However, the TensorFlow Lite model requires a `224x224` square input tensor. 
* *The Problem*: Naively resizing a 4:3 image to 1:1 aggressively distorts the spatial characteristics of the garbage, devastating the neural network's accuracy. 
* *The Solution*: The Python server implements a dynamic **Center-Crop Algorithm** using the PIL library. It mathematically calculates the shortest dimension, crops the center of the image into a perfect square, and *then* resizes it to 224x224. This preserves the exact physical dimensions of the trash.

### 4.4 Asynchronous Telemetry
Network latency is the enemy of physical robotics. If the Node.js Dashboard server lags, the Python API would stall, forcing the physical Arduino motors to wait. 
* To prevent mechanical latency, the Python Flask API utilizes the `threading` library. The moment the AI calculates a prediction, the server instantly returns the `200 OK` JSON response to the ESP32, and pushes the HTTP POST telemetry to the dashboard in a detached background thread.

---

## 5. The Complete Processing Pipeline

1. **Trigger Phase**: An item falls past the Trigger Ultrasonic Sensor. The Arduino registers a distance `< 9.0cm`, locks the system state (`isSorting = true`), and sends the string `"TRIGGER"` over UART to the ESP32.
2. **Capture Phase**: The ESP32 initiates a `2000ms` delay to allow the physical item to stop bouncing on the closed servo flap. It powers the Flash LED to a low PWM duty cycle of `20/255` (preventing brownouts while illuminating the dark bin), flushes stale frames from the camera buffer, captures a fresh JPEG, and POSTs it to the Python server.
3. **Inference Phase**: The Python server crops the image to a square, resizes it, and feeds it into the CPU-optimized TensorFlow Lite model (`smart_bin_model.tflite`). The model returns a confidence array, outputting a specific class.
4. **Command Phase**: Python returns `{"bin": "<class>"}` to the ESP32. The ESP32 reads the JSON and forwards `"SORT:<class>"` to the Arduino via UART.
5. **Actuation Phase**: 
   * The Arduino mathematically maps the class string to a specific degree angle (e.g., `-49.20` degrees).
   * The Stepper motor rotates to the exact angle. 
   * The system rests for `1500ms` to dissipate kinetic vibrations.
   * The Servo motor instantly snaps to `0` degrees, dropping the flap and depositing the item.
   * The Servo smoothly sweeps back to `110` degrees to close the flap, and the Stepper auto-returns to `0.0` degrees to await the next item.
