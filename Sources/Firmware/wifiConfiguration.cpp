#include "LittleFS.h"
// Includes
#include "wifiConfiguration.h"
#include "littleFSHelper.h"
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>

// Variables
AsyncWebServer server(80);
IPAddress localIP(192, 168, 80, 200);  // hardcoded
IPAddress localGateway;
IPAddress subnet(255, 255, 0, 0);

const char* CONFIGURATION_ACCESS_POINT_NAME = "SENIOR_CONNECT_DEVICE";
const char* CONFIGURATION_ACCESS_POINT_PASSWORD = "SENIOR_CONNECT_750da811de3d4aa8bd8a78168f21fff9";
bool configurationAccessPointStarted = false;

// -- Wifi configuration
String ssid;
String pass;
String deviceName;
String primaryKey;

// -- Configuration parameters
const char* PARAM_SSID = "ssid";
const char* PARAM_PASSWORD = "password";
const char* PARAM_DEVICE_NAME = "deviceName";
const char* PARAM_DEVICE_PRIMARY_KEY = "devicePrimaryKey";

// -- Configuration files parameters
const char* SSID_CONFIGURATION_FILE = "/ssid.txt";
const char* PASSWORD_CONFIGURATION_FILE = "/password.txt";
const char* DEVICE_NAME_CONFIGURATION_FILE = "/deviceName.txt";
const char* DEVICE_PRIMARY_KEY_CONFIGURATION_FILE = "/primaryKey.txt";

// -- Timing variables
const long TIMEOUT_WIFI_CONNECTION = 10000;
unsigned long previousMillis = 0;

bool readWifiConfiguration() {
  ssid = readFile(LittleFS, SSID_CONFIGURATION_FILE);
  pass = readFile(LittleFS, PASSWORD_CONFIGURATION_FILE);

  if (ssid == "") {
    Serial.println("Undefined SSID");
    return false;
  }

  if (pass == "") {
    Serial.println("Undefined Password");
    return false;
  }

  return true;
}

bool initWiFi() {
  WiFi.begin(ssid.c_str(), pass.c_str());
  Serial.println("Connecting to WiFi...");

  unsigned long currentMillis = millis();
  previousMillis = currentMillis;

  while (WiFi.status() != WL_CONNECTED) {
    currentMillis = millis();
    if (currentMillis - previousMillis >= TIMEOUT_WIFI_CONNECTION) {
      Serial.println("Failed to connect.");
      return false;
    }
  }

  Serial.println(WiFi.localIP());
  return true;
}

void initWifiConfigurationAccessPoint() {
  if (configurationAccessPointStarted) {
    return;
  }

  Serial.println("Setting AP (Access Point)");
  WiFi.softAP(CONFIGURATION_ACCESS_POINT_NAME, CONFIGURATION_ACCESS_POINT_PASSWORD);

  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);

  server.on("/", HTTP_POST, [](AsyncWebServerRequest* request) {
    int params = request->params();
    Serial.println("Received an request");
    for (int i = 0; i < params; i++) {
      AsyncWebParameter* p = request->getParam(i);
      if (p->isPost()) {
        if (p->name() == PARAM_SSID) {
          ssid = p->value().c_str();
          Serial.print("SSID set to: ");
          Serial.println(ssid);
          // Write file to save value
          writeFile(LittleFS, SSID_CONFIGURATION_FILE, ssid.c_str());
        }

        if (p->name() == PARAM_PASSWORD) {
          pass = p->value().c_str();
          Serial.print("Password set to: ");
          Serial.println(pass);
          // Write file to save value
          writeFile(LittleFS, PASSWORD_CONFIGURATION_FILE, pass.c_str());
        }

        if (p->name() == PARAM_DEVICE_NAME) {
          deviceName = p->value().c_str();
          Serial.print("Device name set to: ");
          Serial.println(deviceName);
          // Write file to save value
          writeFile(LittleFS, DEVICE_NAME_CONFIGURATION_FILE, deviceName.c_str());
        }

        if (p->name() == PARAM_DEVICE_PRIMARY_KEY) {
          primaryKey = p->value().c_str();
          Serial.print("Primary key set to: ");
          Serial.println(primaryKey);
          // Write file to save value
          writeFile(LittleFS, DEVICE_PRIMARY_KEY_CONFIGURATION_FILE, primaryKey.c_str());
        }
      }
    }
    request->send(200, "text/plain", "Done. ESP will restart");
    delay(3000);
    ESP.restart();
  });

  server.begin();
  configurationAccessPointStarted = true;
}

void resetWifiConfiguration() {
  LittleFS.remove(SSID_CONFIGURATION_FILE);
  LittleFS.remove(PASSWORD_CONFIGURATION_FILE);
  LittleFS.remove(DEVICE_NAME_CONFIGURATION_FILE);
  LittleFS.remove(DEVICE_PRIMARY_KEY_CONFIGURATION_FILE);
}

String returnDeviceName() {
  return readFile(LittleFS, DEVICE_NAME_CONFIGURATION_FILE);
}

String returnDeviceKey(){
  return readFile(LittleFS, DEVICE_PRIMARY_KEY_CONFIGURATION_FILE);
}