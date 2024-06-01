#include <WiFi.h>
#include "time.h"

const char* ssid     = "[YOUR SSID]";
const char* password = "[YOUR PASSWORD]";

const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = -10800; // Timezone do Brasil (UTC-3)
const int   daylightOffset_sec = 0;

void setup(){
  Serial.begin(115200);

  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  
  // Init and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  printLocalTime();

  //disconnect WiFi as it's no longer needed
  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);
}

void loop(){
  delay(1000);
  printLocalTime();
}

void printLocalTime(){
  struct tm timeinfo;

  if(!getLocalTime(&timeinfo)){
    Serial.println("Falha ao obter tempo");
    return;
  }

  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
  Serial.print("Dia da semana: ");
  Serial.println(&timeinfo, "%A");
  Serial.print("Mês: ");
  Serial.println(&timeinfo, "%B");
  Serial.print("Dia do mês: ");
  Serial.println(&timeinfo, "%d");
  Serial.print("Ano: ");
  Serial.println(&timeinfo, "%Y");
  Serial.print("Hora: ");
  Serial.println(&timeinfo, "%H");
  Serial.print("Minuto: ");
  Serial.println(&timeinfo, "%M");
  Serial.print("Segundo: ");
  Serial.println(&timeinfo, "%S");
}