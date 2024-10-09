// Includes
#include "timeConfiguration.h"
#include <Arduino_JSON.h>
#include "littleFSHelper.h"
#include <vector>

// Defines
#define CONFIGURATION_MEDICATION_SCHEDULE_PROPERTY "medicationSchedule"
#define LAST_TIME_ALERT_WAS_TRIGGERED_PROPERTY "lastTrigger"
#define COMPARTIMENT_NUMBER_PROPERTY "number"

#define HOUR_PROPERTY "hour"
#define MINUTE_PROPERTY "minute"
#define DAYS_OF_WEEK_PROPERTY "daysOfWeek"
#define MINUTES_TOLERANCE 15

#define TIME_CONFIGURATION_FILE "/timeConfig.txt"
#define NEVER_TRIGGERED_VALUE -1

JSONVar currentTimeConfiguration;
bool isCurrentConfigurationValid = false;

void readTimeConfiguration() {
  String savedConfiguration = readFile(LittleFS, TIME_CONFIGURATION_FILE);

  if (savedConfiguration == "") {
    return;
  }

  currentTimeConfiguration = JSON.parse(savedConfiguration);

  if (JSON.typeof(currentTimeConfiguration) != "array") {
    Serial.println("The saved time configuration is broken");
    return;
  }

  Serial.println(savedConfiguration);
  isCurrentConfigurationValid = true;
}

void setTimeConfiguration(String configurationMessage) {
  JSONVar configuration = JSON.parse(configurationMessage);

  if (JSON.typeof(configuration) == "undefined") {
    Serial.println("Received an configuration message broken");
    return;
  }

  if (String((const char*)configuration["type"]) != "configuration") {  // Should not occour for now
    Serial.print("Received an message that was not an configuration message. Type received: ");
    Serial.println(String((const char*)configuration["type"]));
    return;
  }

  JSONVar timeConfigurationArray = configuration[CONFIGURATION_MEDICATION_SCHEDULE_PROPERTY];
  String timeConfigurationString = JSON.stringify(timeConfigurationArray);

  if (JSON.typeof(timeConfigurationArray) != "array") {
    Serial.print("Received an configuration message with an broken medication schedule. Schedule received: ");
    Serial.println(JSON.stringify(timeConfigurationString));
    return;
  }

  writeFile(LittleFS, TIME_CONFIGURATION_FILE, timeConfigurationString.c_str());

  Serial.println("Saved new time configuration");
  Serial.println(timeConfigurationString);

  currentTimeConfiguration = timeConfigurationArray;
}

void deleteTimeConfiguration() {
  LittleFS.remove(TIME_CONFIGURATION_FILE);
}

std::vector<int> getActiveMedicationAlerts() {
  std::vector<int> activeAlerts;

  if (!isCurrentConfigurationValid || currentTimeConfiguration.length() == 0) {
    return activeAlerts;
  }

  struct tm timeinfo;
  (void)getLocalTime(&timeinfo);

  for (int i = 0; i < currentTimeConfiguration.length(); i++) {
    int lastDayTriggered = NEVER_TRIGGERED_VALUE;
    if (currentTimeConfiguration[i].hasOwnProperty(LAST_TIME_ALERT_WAS_TRIGGERED_PROPERTY)) {
      lastDayTriggered = (int)currentTimeConfiguration[i][LAST_TIME_ALERT_WAS_TRIGGERED_PROPERTY];
    }

    if (checkIfTimeIsBetweenScheduled(timeinfo, currentTimeConfiguration[i])) {
      if (lastDayTriggered != timeinfo.tm_mday) {
        activeAlerts.push_back((int)currentTimeConfiguration[i][COMPARTIMENT_NUMBER_PROPERTY]);
      }
    }
  }

  return activeAlerts;
}

void deactivateSchedulesOfOpenDrawners(std::vector<bool> drawners) {
  if (!isCurrentConfigurationValid || currentTimeConfiguration.length() == 0) {
    return;
  }

  bool configurationChanged = false;
  struct tm timeinfo;
  (void)getLocalTime(&timeinfo);

  for (int i = 0; i < drawners.size(); i++) {
    if (drawners[i]) {
      for (int j = 0; j < currentTimeConfiguration.length(); j++) {
        if ((int)currentTimeConfiguration[j][COMPARTIMENT_NUMBER_PROPERTY] == i) {
          if (checkIfTimeIsBetweenScheduled(timeinfo, currentTimeConfiguration[j])) {
            currentTimeConfiguration[j][LAST_TIME_ALERT_WAS_TRIGGERED_PROPERTY] = timeinfo.tm_mday;
            Serial.print("Detected the opening of the drawner ");
            Serial.print(i);
            Serial.println(" and by this reason a scheduled time was deactivated");
            configurationChanged = true;
          }
        }
      }
    }
  }

  if (configurationChanged) {
    writeFile(LittleFS, TIME_CONFIGURATION_FILE, JSON.stringify(currentTimeConfiguration).c_str());
  }
}

bool checkIfTimeIsBetweenScheduled(struct tm timeInfo, JSONVar schedule) {
  bool dayOfWeekCorrect = false;

  for (int i = 0; i < schedule[DAYS_OF_WEEK_PROPERTY].length(); i++) {
    if ((int)schedule[DAYS_OF_WEEK_PROPERTY][i] == timeInfo.tm_wday) {
      dayOfWeekCorrect = true;
    }
  }

  if (!dayOfWeekCorrect) {
    return false;
  }

  int scheduledHour = (int)schedule[HOUR_PROPERTY];
  int scheduledMinute = (int)schedule[MINUTE_PROPERTY];

  int currentMinutes = timeInfo.tm_hour * 60 + timeInfo.tm_min;
  int scheduledMinutes = scheduledHour * 60 + scheduledMinute;

  return currentMinutes >= scheduledMinutes && currentMinutes < scheduledMinutes + MINUTES_TOLERANCE;
}