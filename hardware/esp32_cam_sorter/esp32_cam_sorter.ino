#include "esp_camera.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "esp_http_server.h"

// ===========================
// Enter your WiFi credentials
// ===========================
const char* ssid = "DESKTOP-KB425NS 6794";
const char* password = "99*1z67Q";

// ===========================
// Enter your PC's IP address
// ===========================
String serverName = "http://192.168.137.1:5001/predict"; 

// ===========================
// HC-SR04 Pins
// ===========================
#define TRIG_PIN 13
#define ECHO_PIN 12
#define DIST_THRESHOLD_CM 10

// CAMERA_MODEL_AI_THINKER Pins
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27

#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

bool objectPresent = false;
unsigned long lastTriggerTime = 0;

httpd_handle_t stream_httpd = NULL;

#define PART_BOUNDARY "123456789000000000000987654321"
static const char* _STREAM_CONTENT_TYPE = "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;
static const char* _STREAM_BOUNDARY = "\r\n--" PART_BOUNDARY "\r\n";
static const char* _STREAM_PART = "Content-Type: image/jpeg\r\nContent-Length: %u\r\n\r\n";

static esp_err_t stream_handler(httpd_req_t *req) {
  camera_fb_t * fb = NULL;
  esp_err_t res = ESP_OK;
  size_t _jpg_buf_len;
  uint8_t * _jpg_buf;
  char * part_buf[64];
  
  res = httpd_resp_set_type(req, _STREAM_CONTENT_TYPE);
  if(res != ESP_OK) return res;
  
  while(true) {
    fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("Stream: Camera capture failed");
      res = ESP_FAIL;
      break;
    }
    
    _jpg_buf_len = fb->len;
    _jpg_buf = fb->buf;
    
    if(res == ESP_OK) {
      res = httpd_resp_send_chunk(req, _STREAM_BOUNDARY, strlen(_STREAM_BOUNDARY));
    }
    if(res == ESP_OK) {
      size_t hlen = snprintf((char *)part_buf, 64, _STREAM_PART, _jpg_buf_len);
      res = httpd_resp_send_chunk(req, (const char *)part_buf, hlen);
    }
    if(res == ESP_OK) {
      res = httpd_resp_send_chunk(req, (const char *)_jpg_buf, _jpg_buf_len);
    }
    esp_camera_fb_return(fb);
    if(res != ESP_OK) break;
  }
  return res;
}

void startCameraServer() {
  httpd_config_t config = HTTPD_DEFAULT_CONFIG();
  config.server_port = 81; 
  
  httpd_uri_t stream_uri = {
    .uri       = "/stream",
    .method    = HTTP_GET,
    .handler   = stream_handler,
    .user_ctx  = NULL
  };
  
  if (httpd_start(&stream_httpd, &config) == ESP_OK) {
    httpd_register_uri_handler(stream_httpd, &stream_uri);
  }
}

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println();
  
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  // Initialize Camera
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  
  // Frame parameters
  if(psramFound()){
    config.frame_size = FRAMESIZE_VGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }
  
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected.");
  Serial.print("Live Stream is running at: http://");
  Serial.print(WiFi.localIP());
  Serial.println(":81/stream");
  
  startCameraServer();
}

void loop() {
  if (Serial.available() > 0) {
    char cmd = Serial.read();
    
    // Ignore newlines and carriage returns
    if (cmd == '\n' || cmd == '\r') {
      return;
    }
    
    if (cmd == 'C' || cmd == 'c') {
      Serial.println("Manual capture triggered. Taking picture...");
      
      // Take picture
      camera_fb_t * fb = esp_camera_fb_get();
      if (!fb) {
        Serial.println("Camera capture failed");
        return;
      }
      
      // Send to ML backend
      sendImageToBackend(fb);
      
      // Return frame buffer
      esp_camera_fb_return(fb);
      
      Serial.println("\nReady for next capture. Type 'C' to take another picture.");
    }
  }
  
  delay(100);
}

void sendImageToBackend(camera_fb_t * fb) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected");
    return;
  }

  // Let's use WiFiClient directly for multipart/form-data for reliability with large payloads
  sendMultipartDirect(fb);
}

void sendMultipartDirect(camera_fb_t * fb) {
  WiFiClient client;
  
  String host = serverName.substring(7);
  int portIndex = host.indexOf(':');
  int slashIndex = host.indexOf('/');
  
  String ip = host.substring(0, portIndex);
  int port = host.substring(portIndex + 1, slashIndex).toInt();
  String path = host.substring(slashIndex);
  
  if (!client.connect(ip.c_str(), port)) {
    Serial.println("Connection to server failed");
    return;
  }

  String boundary = "----SmartSortBoundary";
  String head = "--" + boundary + "\r\nContent-Disposition: form-data; name=\"image\"; filename=\"capture.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n";
  String tail = "\r\n--" + boundary + "--\r\n";

  uint32_t contentLength = head.length() + fb->len + tail.length();

  client.print("POST " + path + " HTTP/1.1\r\n");
  client.print("Host: " + ip + "\r\n");
  client.print("Authorization: Bearer smartsort-ml-secret-key-2026\r\n");
  client.print("Content-Length: " + String(contentLength) + "\r\n");
  client.print("Content-Type: multipart/form-data; boundary=" + boundary + "\r\n");
  client.print("\r\n");
  
  client.print(head);
  
  uint8_t *fbBuf = fb->buf;
  size_t fbLen = fb->len;
  for (size_t n = 0; n < fbLen; n = n + 1024) {
    if (n + 1024 < fbLen) {
      client.write(fbBuf, 1024);
      fbBuf += 1024;
    } else if (fbLen % 1024 > 0) {
      size_t remainder = fbLen % 1024;
      client.write(fbBuf, remainder);
    }
  }
  
  client.print(tail);
  
  // Read response
  String response = "";
  long timeout = millis();
  while (client.connected() || client.available()) {
    if (client.available()) {
      char c = client.read();
      response += c;
    }
    if (millis() - timeout > 10000) break;
  }
  
  client.stop();
  
  Serial.println("--- Server Response ---");
  Serial.println(response);
  Serial.println("-----------------------");
  
  // Parse JSON response (skipping HTTP headers)
  int jsonStart = response.indexOf('{');
  if (jsonStart >= 0) {
    String jsonStr = response.substring(jsonStart);
    
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, jsonStr);
    
    if (!error) {
      String bin = doc["bin"].as<String>();
      Serial.print("Predicted Bin: ");
      Serial.println(bin);
      
      // Send command to Arduino Uno
      // class_names = ['glass', 'metal', 'paper', 'plastic', 'rejected_waste']
      if (bin == "glass") {
        Serial.print('G');
      } else if (bin == "metal") {
        Serial.print('M');
      } else if (bin == "paper") {
        Serial.print('P');
      } else if (bin == "plastic") {
        Serial.print('L'); // L for pLastic
      } else if (bin == "rejected_waste") {
        Serial.print('R');
      }
      
    } else {
      Serial.println("JSON parse failed");
    }
  } else {
    Serial.println("Invalid response from server");
  }
}
