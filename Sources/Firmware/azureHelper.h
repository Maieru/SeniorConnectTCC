#ifndef AZUREHELPER_H_INCLUDED
#define AZUREHELPER_H_INCLUDED

void initializeIoTHubClient();
int initializeMqttClient();
void sendTelemetry(String telemetry_payload);

#endif