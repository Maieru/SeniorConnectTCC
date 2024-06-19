// Includes
#include <WiFi.h>
#include "wifiConfiguration.h"
#include "littleFSHelper.h"
#include "rgbLedHelper.h"
#include "ntpHelper.h"
#include "azureHelper.h"
#include "sensorHelper.h"
#include <vector>

// Defines
#define POWER_LED 13

#define STATUS_LED_RED 12
#define STATUS_LED_GREEN 27
#define STATUS_LED_BLUE 26

#define RESET_BUTTON 14

#define STATUS_LED_BLINK_TIME 500

// Defines For Debug (should be deleted after testing)
#define INTAKE_LED_1 25

// Variables

enum state {
  NORMAL,
  RESETING,
};

bool isWifiStarted = false;
bool isTimeInitialized = false;
state currentState = state::NORMAL;
unsigned long resetMilis = 0;
unsigned long lastExecutionMillis = 0;
std::vector<bool> lastSensorStatus;

const int TIME_TO_RESET = 3000;

void setup() {
  Serial.begin(115200);

  initLittleFS();

  pinMode(POWER_LED, OUTPUT);

  pinMode(STATUS_LED_RED, OUTPUT);
  pinMode(STATUS_LED_GREEN, OUTPUT);
  pinMode(STATUS_LED_BLUE, OUTPUT);
  pinMode(RESET_BUTTON, INPUT);

  // Pins used for debug
  initializeSensors();
  pinMode(INTAKE_LED_1, OUTPUT);

  digitalWrite(POWER_LED, HIGH);
  setRGBLed(ledColor::OFF, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);

  bool isWifiConfigured = readWifiConfiguration();

  if (isWifiConfigured) {
    setRGBLed(ledColor::CYAN, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);

    if (initWiFi()) {
      isWifiStarted = true;

      setRGBLed(ledColor::OFF, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);
      delay(STATUS_LED_BLINK_TIME);
      setRGBLed(ledColor::CYAN, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);

      initializeTime();
      setRGBLed(ledColor::OFF, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);
      delay(STATUS_LED_BLINK_TIME);
      setRGBLed(ledColor::CYAN, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);

      initializeIoTHubClient();
      setRGBLed(ledColor::OFF, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);
      delay(STATUS_LED_BLINK_TIME);
      setRGBLed(ledColor::CYAN, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);

      (void)initializeMqttClient();

      setRGBLed(ledColor::GREEN, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);
    } else {
      setRGBLed(ledColor::RED, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);
    }
  } else {
    initWifiConfigurationAccessPoint();
    setRGBLed(ledColor::BLUE, STATUS_LED_RED, STATUS_LED_GREEN, STATUS_LED_BLUE);
  }
}

void loop() {
  std::vector<bool> currentSensorStatus;
  unsigned long currentMillis = millis();
  String telemetryMessage;

  switch (currentState) {
    case NORMAL:
      if (digitalRead(RESET_BUTTON)) {
        resetMilis = millis();
        currentState = state::RESETING;
        return;
      }

      // This adds an 1 milisecond delay between executions
      if (currentMillis - lastExecutionMillis < 1) {
        return;
      }

      lastExecutionMillis = currentMillis;

      // Future things will be added here :)
      currentSensorStatus = getSensorStatus();

      if (!(lastSensorStatus.empty() || std::equal(currentSensorStatus.begin(), currentSensorStatus.end(), lastSensorStatus.begin()))) {
        telemetryMessage = getTelemetryPayload(currentSensorStatus);
        Serial.println(telemetryMessage);
        sendTelemetry(telemetryMessage);        
      }

      lastSensorStatus = currentSensorStatus;

      break;

    case RESETING:
      if (!digitalRead(RESET_BUTTON)) {
        currentState = state::NORMAL;
        return;
      }

      if (millis() - resetMilis > TIME_TO_RESET) {
        resetWifiConfiguration();
        ESP.restart();
      }
      break;
  }
}
