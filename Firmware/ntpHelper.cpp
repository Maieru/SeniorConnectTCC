// Includes
#include <WiFi.h>
#include "time.h"

// Defines
#define PST_TIME_ZONE -3 // Hardcoded for Brasilia time zone
#define PST_TIME_ZONE_DAYLIGHT_SAVINGS_DIFF 0 

#define GMT_OFFSET_SECS (PST_TIME_ZONE * 3600)
#define GMT_OFFSET_SECS_DST ((PST_TIME_ZONE + PST_TIME_ZONE_DAYLIGHT_SAVINGS_DIFF) * 3600)
#define NTP_SERVERS "pool.ntp.org", "time.nist.gov"
#define UNIX_TIME_NOV_13_2017 1510592825

void initializeTime() {
  Serial.println("Setting time using SNTP");

  configTime(GMT_OFFSET_SECS, GMT_OFFSET_SECS_DST, NTP_SERVERS);
  time_t now = time(NULL);

  while (now < UNIX_TIME_NOV_13_2017) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }

  Serial.println("");
  Serial.println("Time initialized!");
}