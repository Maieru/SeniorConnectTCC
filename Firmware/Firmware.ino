// Includes
#include <WiFi.h>
#include "wifiConfiguration.h"
#include "littleFSHelper.h"
#include "rgbLedHelper.h"

// Defines
#define POWER_LED 13

#define STATUS_LED_RED 12
#define STATUS_LED_GREEN 27
#define STATUS_LED_BLUE 26

#define RESET_BUTTON 14

// Variables

enum state {
  NORMAL,
  RESETING,
};

bool isWifiStarted = false;
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
      break;

    case RESETING:
      if (!digitalRead(RESET_BUTTON)) {
        currentState = state::NORMAL;
      }

      if (millis() - resetMilis > TIME_TO_RESET){
        resetWifiConfiguration();
        ESP.restart();
      }
      break;
  }
}
