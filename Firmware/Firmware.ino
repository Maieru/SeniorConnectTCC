// Includes
#include <WiFi.h>
#include "wifiConfiguration.h"
#include "littleFSHelper.h"
#include "rgbLedHelper.h"
#include "ntpHelper.h"
#include "azureHelper.h"

// Defines
#define POWER_LED 13

#define STATUS_LED_RED 12
#define STATUS_LED_GREEN 27
#define STATUS_LED_BLUE 26

#define RESET_BUTTON 14

#define STATUS_LED_BLINK_TIME 250

// Variables

enum state {
  NORMAL,
  RESETING,
};

bool isWifiStarted = false;
bool isTimeInitialized = false;
state currentState = state::NORMAL;
unsigned long resetMilis = 0;
const int TIME_TO_RESET = 3000;

void setup() {
  Serial.begin(115200);

  initLittleFS();

  pinMode(POWER_LED, OUTPUT);

  pinMode(STATUS_LED_RED, OUTPUT);
  pinMode(STATUS_LED_GREEN, OUTPUT);
  pinMode(STATUS_LED_BLUE, OUTPUT);
  pinMode(RESET_BUTTON, INPUT);

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
  switch (currentState) {
    case NORMAL:
      if (digitalRead(RESET_BUTTON)) {
        resetMilis = millis();
        currentState = state::RESETING;
      }

      // Future things will be added here :)
      sendTelemetry("{status: ok}");
      delay(60000);
      break;

    case RESETING:
      if (!digitalRead(RESET_BUTTON)) {
        currentState = state::NORMAL;
      }

      if (millis() - resetMilis > TIME_TO_RESET) {
        resetWifiConfiguration();
        ESP.restart();
      }
      break;
  }
}
