#include <WiFi.h>

const String WIFI_SSID = "MAIERU_PC";
const String WIFI_PASSPHRASE = "123456789";

void setup() {
  Serial.begin(9600);

  Serial.print("Conectando-se ao Wi-Fi");
  
  WiFi.begin(WIFI_SSID, WIFI_PASSPHRASE, 6);

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println("Wifi Conectado!");
}

void loop() {
  delay(100); // TODO: Construa algo incrível!
}