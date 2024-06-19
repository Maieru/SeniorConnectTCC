// For now, this helper is being writen this way because i dont have the required hardware
// in the future, it will use an multiplexer to read the data of the sensor.

// Includes
#include <arduino.h>
#include <vector>
#include <Arduino_JSON.h>

// Defines
#define OPEN_SENSOR_1 33

#define NUMBER_OF_DRAWNERS 9

#define PAYLOAD_YEAR_PROPERTY "year"
#define PAYLOAD_MONTH_PROPERTY "month"
#define PAYLOAD_DAY_PROPERTY "day"
#define PAYLOAD_HOUR_PROPERTY "hour"
#define PAYLOAD_MINUTE_PROPERTY "minute"
#define PAYLOAD_SECOND_PROPERTY "second"
#define PAYLOAD_MILLIS_PROPERTY "millis"
#define PAYLOAD_SENSOR_DATA_PROPERTY "sensorData"
#define PAYLOAD_SENSOR_NUMBER_PROPERTY "number"
#define PAYLOAD_SENSOR_STATE_PROPERTY "state"

void initializeSensors() {
  pinMode(OPEN_SENSOR_1, INPUT);
}

std::vector<bool> getSensorStatus() {
  std::vector<bool> outputVector;

  // Should be rewriten in the future. DONT FORGET THE -1 ON THE FOR CONDITION
  outputVector.push_back(digitalRead(OPEN_SENSOR_1));
  for (char i = 0; i < NUMBER_OF_DRAWNERS - 1; i++) {
    outputVector.push_back(false);
  }

  return outputVector;
}

String getTelemetryPayload(std::vector<bool> currentSensorStatus) {
  JSONVar jsonObject;

  struct tm timeinfo;
  (void)getLocalTime(&timeinfo);

  jsonObject[PAYLOAD_YEAR_PROPERTY] = timeinfo.tm_year + 1900;
  jsonObject[PAYLOAD_MONTH_PROPERTY] = timeinfo.tm_mon + 1;
  jsonObject[PAYLOAD_DAY_PROPERTY] = timeinfo.tm_mday;
  jsonObject[PAYLOAD_HOUR_PROPERTY] = timeinfo.tm_hour;
  jsonObject[PAYLOAD_MINUTE_PROPERTY] = timeinfo.tm_min;
  jsonObject[PAYLOAD_SECOND_PROPERTY] = timeinfo.tm_sec;
  jsonObject[PAYLOAD_MILLIS_PROPERTY] = millis();

  for (int i = 0; i < currentSensorStatus.size(); i++) {
    jsonObject[PAYLOAD_SENSOR_DATA_PROPERTY][i][PAYLOAD_SENSOR_NUMBER_PROPERTY] = i;
    jsonObject[PAYLOAD_SENSOR_DATA_PROPERTY][i][PAYLOAD_SENSOR_STATE_PROPERTY] = currentSensorStatus[i];
  }

  return JSON.stringify(jsonObject);
}