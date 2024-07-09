#ifndef SENSORHELPER_H_INCLUDED
#define SENSORHELPER_H_INCLUDED

#include <vector>

void initializeSensors();
std::vector<bool> getSensorStatus();
String getTelemetryPayload(std::vector<bool> currentSensorStatus);

#endif