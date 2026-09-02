#include "esp_camera.h"
#include "esp_http_server.h"
#include "soc/rtc_cntl_reg.h"
#include "soc/soc.h"
#include <ArduinoOTA.h>
#include <HTTPClient.h>
#include <WiFi.h>

// --- UPDATE THESE WITH YOUR DETAILS ---
const char *WIFI_SSID = "DESKTOP-KB425NS 6794";
const char *WIFI_PASSWORD = "99*1z67Q";
const char *ML_PREDICT_URL = "http://192.168.137.1:5001/predict";
const char *FILL_LEVELS_URL = "http://192.168.137.1:5001/api/fill-levels";
const char *ML_API_KEY = "smartsort-ml-secret-key-2026";
// -------------------

// ESP32-CAM Pins
#define PWDN_GPIO_NUM 32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM 0
#define SIOD_GPIO_NUM 26
#define SIOC_GPIO_NUM 27
#define Y9_GPIO_NUM 35
#define Y8_GPIO_NUM 34
#define Y7_GPIO_NUM 39
#define Y6_GPIO_NUM 36
#define Y5_GPIO_NUM 21
#define Y4_GPIO_NUM 19
#define Y3_GPIO_NUM 18
#define Y2_GPIO_NUM 5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM 23
#define PCLK_GPIO_NUM 22

#define FLASH_LED_PIN 4

// --- LIVE STREAM SERVER VARIABLES & FUNCTIONS ---
httpd_handle_t stream_httpd = NULL;
#define PART_BOUNDARY "123456789000000000000987654321"
static const char *_STREAM_CONTENT_TYPE =
    "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;
static const char *_STREAM_BOUNDARY = "\r\n--" PART_BOUNDARY "\r\n";
static const char *_STREAM_PART =
    "Content-Type: image/jpeg\r\nContent-Length: %u\r\n\r\n";

esp_err_t stream_handler(httpd_req_t *req) {
  camera_fb_t *fb = NULL;
  esp_err_t res = ESP_OK;
  size_t _jpg_buf_len = 0;
  uint8_t *_jpg_buf = NULL;
  char *part_buf[64];

  res = httpd_resp_set_type(req, _STREAM_CONTENT_TYPE);
  if (res != ESP_OK)
    return res;

  while (true) {
    fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("Camera capture failed");
      res = ESP_FAIL;
    } else {
      _jpg_buf_len = fb->len;
      _jpg_buf = fb->buf;
    }
    if (res == ESP_OK) {
      size_t hlen = snprintf((char *)part_buf, 64, _STREAM_PART, _jpg_buf_len);
      res = httpd_resp_send_chunk(req, (const char *)part_buf, hlen);
    }
    if (res == ESP_OK) {
      res = httpd_resp_send_chunk(req, (const char *)_jpg_buf, _jpg_buf_len);
    }
    if (res == ESP_OK) {
      res = httpd_resp_send_chunk(req, _STREAM_BOUNDARY,
                                  strlen(_STREAM_BOUNDARY));
    }
    if (fb) {
      esp_camera_fb_return(fb);
      fb = NULL;
      _jpg_buf = NULL;
    }
    if (res != ESP_OK) {
      break;
    }
  }
  return res;
}

void startCameraServer() {
  httpd_config_t config = HTTPD_DEFAULT_CONFIG();
  config.server_port = 80;

  httpd_uri_t stream_uri = {.uri = "/stream",
                            .method = HTTP_GET,
                            .handler = stream_handler,
                            .user_ctx = NULL};

  if (httpd_start(&stream_httpd, &config) == ESP_OK) {
    httpd_register_uri_handler(stream_httpd, &stream_uri);
  }
}
// ------------------------------------------------

unsigned long lastFillLevelTime = 0;

void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
  Serial.begin(9600);
  delay(1000);

  // Setup Flash LED with PWM (ESP32 Core 3.x API)
  ledcAttach(FLASH_LED_PIN, 5000, 8);
  ledcWrite(FLASH_LED_PIN, 0); // Start with it OFF

  // Init Camera
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
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  // REDUCED RESOLUTION: QVGA (320x240) to prevent HTTP POST memory crashes.
  // The Python ML model downsizes to 224x224 anyway, so this is perfect.
  if (psramFound()) {
    config.frame_size = FRAMESIZE_QVGA;
    config.jpeg_quality = 12; // 10-12 is good
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_QVGA;
    config.jpeg_quality = 15;
    config.fb_count = 1;
  }
  esp_camera_init(&config);

  // Init WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  // Start the live stream web server
  startCameraServer();
  Serial.println("");
  Serial.println("=========================================");
  Serial.println("  WiFi Connected!");
  Serial.print("  Live Stream URL: http://");
  Serial.print(WiFi.localIP());
  Serial.println("/stream");
  Serial.println("=========================================");

  // Init OTA
  ArduinoOTA.setHostname("esp32-cam-smartsort");
  ArduinoOTA.begin();
}

void loop() {
  unsigned long now = millis();

  // 0. IMPORTANT: Listen for OTA flash requests!
  ArduinoOTA.handle();

  // 1. Auto-Reconnect Wi-Fi if it drops
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    unsigned long startAttemptTime = millis();
    while (WiFi.status() != WL_CONNECTED &&
           millis() - startAttemptTime < 10000) {
      delay(500);
    }
    if (WiFi.status() != WL_CONNECTED)
      return; // Try again next loop
  }

  // 2. Every 5 seconds (5,000 ms), ask Arduino for fill levels
  if (now - lastFillLevelTime > 5000) {
    lastFillLevelTime = now;
    Serial.println("READ_LEVELS");
  }

  // 3. Listen for messages from Arduino
  if (Serial.available()) {
    String incoming = Serial.readStringUntil('\n');
    incoming.trim();

    // Handle Image Trigger
    if (incoming == "TRIGGER") {
      Serial.println(
          "Trigger received! Waiting 3 seconds for item to settle...");
      delay(3000); // 3-second delay before taking the picture

      // -- PICTURE SEQUENCE --
      // Reduced flash brightness (15 out of 255 ≈ 6%) to eliminate
      // glare/washout on shiny & metallic items
      ledcWrite(FLASH_LED_PIN, 15);
      delay(250); // Wait for auto-exposure to adjust

      // The ESP32 camera buffers old frames in memory (fb_count).
      // We must flush the old/stale frames out of the queue to ensure
      // we grab a brand new frame taken *after* the flash turned on.
      camera_fb_t *fb = esp_camera_fb_get();
      if (fb) esp_camera_fb_return(fb); // Flush 1
      fb = esp_camera_fb_get();
      if (fb) esp_camera_fb_return(fb); // Flush 2

      // Now capture the fresh frame
      fb = esp_camera_fb_get();
      
      ledcWrite(FLASH_LED_PIN, 0); // Turn off flash immediately!
      // ----------------------

      if (!fb)
        return;

      if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(ML_PREDICT_URL);
        http.addHeader("Content-Type", "application/octet-stream");
        http.addHeader("Authorization", "Bearer " + String(ML_API_KEY));

        int httpCode = http.POST(fb->buf, fb->len);
        if (httpCode == 200) {
          String response = http.getString();
          int binStart = response.indexOf("\"bin\":\"") + 7;
          int binEnd = response.indexOf("\"", binStart);
          if (binStart > 6 && binEnd > binStart) {
            String bin = response.substring(binStart, binEnd);
            Serial.println("SORT:" + bin); // Send command to Arduino
          }
        }
        http.end();
      }
      esp_camera_fb_return(fb);
    }

    // Handle Fill Level Data
    else if (incoming.startsWith("LEVELS:")) {
      String data = incoming.substring(7);

      // Parse 4 values: glass, metal, paper, rejected
      int idx1 = data.indexOf(',');
      int idx2 = data.indexOf(',', idx1 + 1);
      int idx3 = data.indexOf(',', idx2 + 1);

      if (idx1 > 0 && idx2 > 0 && idx3 > 0) {
        String glassLevel = data.substring(0, idx1);
        String metalLevel = data.substring(idx1 + 1, idx2);
        String paperLevel = data.substring(idx2 + 1, idx3);
        String rejectedLevel = data.substring(idx3 + 1);

        if (WiFi.status() == WL_CONNECTED) {
          HTTPClient http;
          http.begin(FILL_LEVELS_URL);
          http.addHeader("Content-Type", "application/json");
          String json = "{\"glass_cm\":" + glassLevel +
                        ",\"metal_cm\":" + metalLevel +
                        ",\"paper_plastic_cm\":" + paperLevel +
                        ",\"rejected_waste_cm\":" + rejectedLevel + "}";
          http.POST(json);
          http.end();
        }
      }
    }
  }
}
