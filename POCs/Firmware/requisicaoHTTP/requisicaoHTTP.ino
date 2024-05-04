#include <WiFi.h>
#include <HTTPClient.h>
#include <sMQTTBroker.h>

const char* WIFI_SSID = "MAIERU_PC";
const char* WIFI_PASSPHRASE = "123456789";
const String SERVER = "https://jsonplaceholder.typicode.com/todos/1";

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
  delay(1000);

  if(WiFi.status() == WL_CONNECTED){
      HTTPClient httpClient;

      String serverPath = SERVER;
      
      // Your Domain name with URL path or IP address with path
      httpClient.begin(serverPath.c_str());
      Serial.println(serverPath);
      
      // If you need Node-RED/server authentication, insert user and password below
      //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");
      
      // Send HTTP GET request
      int httpResponseCode = httpClient.GET();
      
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = httpClient.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      httpClient.end();
    }
}