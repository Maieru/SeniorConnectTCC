#ifndef TIME_CONFIGURATION_H_INCLUDED
#define TIME_CONFIGURATION_H_INCLUDED

#include <arduino.h>
#include <vector>
#include <Arduino_JSON.h>

void setTimeConfiguration(String configurationMessage);
void readTimeConfiguration();
std::vector<int> getActiveMedicationAlerts();
void deactivateSchedulesOfOpenDrawners(std::vector<bool> drawners);
bool checkIfTimeIsBetweenScheduled(struct tm timeInfo, JSONVar schedule);

#endif