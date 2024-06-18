#ifndef WIFICONFIGURATION_H_INCLUDED
#define WIFICONFIGURATION_H_INCLUDED

#include "littleFSHelper.h"
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>

bool readWifiConfiguration();
bool initWiFi();
void initWifiConfigurationAccessPoint();
void resetWifiConfiguration();

#endif