// Includes
#include <az_core.h>
#include <az_iot.h>
#include <azure_ca.h>
#include <mqtt_client.h>
#include "AzIoTSasToken.h"
#include "iot_config.h"
#include "wifiConfiguration.h"
#include "timeConfiguration.h"
#include "azureHelper.h"

// Defines
#define AZURE_SDK_CLIENT_USER_AGENT "c%2F" AZ_SDK_VERSION_STRING "(ard;esp32)"
#define sizeofarray(a) (sizeof(a) / sizeof(a[0]))
#define SAS_TOKEN_DURATION_IN_MINUTES 1440
#define INCOMING_DATA_BUFFER_SIZE 32768
#define MQTT_QOS1 1
#define DO_NOT_RETAIN_MSG 0
#define IOT_CONFIG_DEVICE_KEY returnDeviceKey()

// Variables
static az_iot_hub_client client;
static esp_mqtt_client_handle_t mqtt_client;
static const char* host = IOT_CONFIG_IOTHUB_FQDN;
static const char* mqtt_broker_uri = "mqtts://" IOT_CONFIG_IOTHUB_FQDN;
static const int mqtt_port = AZ_IOT_DEFAULT_MQTT_CONNECT_PORT;

static char mqtt_client_id[128];
static char mqtt_username[128];
static char mqtt_password[200];
static char telemetry_topic[128];
static uint8_t sas_signature_buffer[256];
static az_span device_key_span;
static AzIoTSasToken* sasToken;
static char incoming_data[INCOMING_DATA_BUFFER_SIZE];

void initializeIoTHubClient() {
  az_iot_hub_client_options options = az_iot_hub_client_options_default();
  options.user_agent = AZ_SPAN_FROM_STR(AZURE_SDK_CLIENT_USER_AGENT);

  String device_id_string = returnDeviceName();

  if (sasToken == nullptr) {
    Serial.println("sasToken is not initialized.");
  } else {
    Serial.println("sasToken is initialized.");
  }

  if (sasToken == nullptr) {
    Serial.println("Configuring new SAS TOKEN");
    String deviceKeyString = returnDeviceKey();
    az_span device_key_span = az_span_create((uint8_t*)deviceKeyString.c_str(), deviceKeyString.length());
    sasToken = new AzIoTSasToken(&client, device_key_span, AZ_SPAN_FROM_BUFFER(sas_signature_buffer), AZ_SPAN_FROM_BUFFER(mqtt_password));
  }

  char* device_id = new char[device_id_string.length() + 1];
  strcpy(device_id, device_id_string.c_str());

  if (az_result_failed(az_iot_hub_client_init(&client, az_span_create((uint8_t*)host, strlen(host)), az_span_create((uint8_t*)device_id, strlen(device_id)), &options))) {
    Serial.println("Failed initializing Azure IoT Hub client");
    return;
  }

  size_t client_id_length;
  if (az_result_failed(az_iot_hub_client_get_client_id(&client, mqtt_client_id, sizeof(mqtt_client_id) - 1, &client_id_length))) {
    Serial.println("Failed getting client id");
    return;
  }

  if (az_result_failed(az_iot_hub_client_get_user_name(&client, mqtt_username, sizeofarray(mqtt_username), NULL))) {
    Serial.println("Failed to get MQTT clientId, return code");
    return;
  }

  Serial.println("Client ID: " + String(mqtt_client_id));
  Serial.println("Username: " + String(mqtt_username));
}

void checkSASToken() {
  if (sasToken->IsExpired()) {
    Serial.println("SAS token expired; reconnecting with a new one.");
    (void)esp_mqtt_client_destroy(mqtt_client);
    initializeMqttClient();
  }
}

static esp_err_t mqtt_event_handler(esp_mqtt_event_handle_t event) {
  // For information about what type of event is:
  // https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/protocols/mqtt.html#events

  switch (event->event_id) {
    int i, r;

    case MQTT_EVENT_ERROR:
      Serial.println("MQTT event MQTT_EVENT_ERROR");
      break;
    case MQTT_EVENT_CONNECTED:
      Serial.println("MQTT event MQTT_EVENT_CONNECTED");

      r = esp_mqtt_client_subscribe(mqtt_client, AZ_IOT_HUB_CLIENT_C2D_SUBSCRIBE_TOPIC, 1);
      if (r == -1) {
        Serial.println("Could not subscribe for cloud-to-device messages.");
      } else {
        Serial.println("Subscribed for cloud-to-device messages; message id:" + String(r));
      }

      break;
    case MQTT_EVENT_DISCONNECTED:
      Serial.println("MQTT event MQTT_EVENT_DISCONNECTED");
      break;
    case MQTT_EVENT_SUBSCRIBED:
      Serial.println("MQTT event MQTT_EVENT_SUBSCRIBED");
      break;
    case MQTT_EVENT_UNSUBSCRIBED:
      Serial.println("MQTT event MQTT_EVENT_UNSUBSCRIBED");
      break;
    case MQTT_EVENT_PUBLISHED:
      Serial.println("MQTT event MQTT_EVENT_PUBLISHED");
      break;
    case MQTT_EVENT_DATA:
      Serial.println("MQTT event MQTT_EVENT_DATA");

      for (i = 0; i < (INCOMING_DATA_BUFFER_SIZE - 1) && i < event->topic_len; i++) {
        incoming_data[i] = event->topic[i];
      }
      incoming_data[i] = '\0';
      Serial.println("Topic: " + String(incoming_data));

      for (i = 0; i < (INCOMING_DATA_BUFFER_SIZE - 1) && i < event->data_len; i++) {
        incoming_data[i] = event->data[i];
      }
      incoming_data[i] = '\0';

      Serial.println("Data: " + String(incoming_data));
      setTimeConfiguration(String(incoming_data));

      break;
    case MQTT_EVENT_BEFORE_CONNECT:
      Serial.println("MQTT event MQTT_EVENT_BEFORE_CONNECT");
      break;
    default:
      Serial.println("MQTT event UNKNOWN");
      break;
  }

  return ESP_OK;
}

int initializeMqttClient() {
  if (sasToken->Generate(SAS_TOKEN_DURATION_IN_MINUTES) != 0) {
    Serial.println("Failed generating SAS token");
    return 1;
  }

  esp_mqtt_client_config_t mqtt_config;
  memset(&mqtt_config, 0, sizeof(mqtt_config));
  mqtt_config.uri = mqtt_broker_uri;
  mqtt_config.port = mqtt_port;
  mqtt_config.client_id = mqtt_client_id;
  mqtt_config.username = mqtt_username;
  mqtt_config.password = (const char*)az_span_ptr(sasToken->Get());

  mqtt_config.keepalive = 30;
  mqtt_config.disable_clean_session = 0;
  mqtt_config.disable_auto_reconnect = false;
  mqtt_config.event_handle = mqtt_event_handler;
  mqtt_config.user_context = NULL;
  mqtt_config.cert_pem = (const char*)ca_pem;

  mqtt_client = esp_mqtt_client_init(&mqtt_config);

  if (mqtt_client == NULL) {
    Serial.println("Failed creating mqtt client");
    return 1;
  }

  esp_err_t start_result = esp_mqtt_client_start(mqtt_client);

  if (start_result != ESP_OK) {
    Serial.println("Could not start mqtt client; error code:" + start_result);
    return 1;
  } else {
    Serial.println("MQTT client started");
    return 0;
  }
}

void sendTelemetry(String telemetry_payload) {
  Serial.println("Sending telemetry ...");

  // The topic could be obtained just once during setup,
  // however if properties are used the topic need to be generated again to reflect the
  // current values of the properties.
  if (az_result_failed(az_iot_hub_client_telemetry_get_publish_topic(&client, NULL, telemetry_topic, sizeof(telemetry_topic), NULL))) {
    Serial.println("Failed az_iot_hub_client_telemetry_get_publish_topic");
    return;
  }

  if (esp_mqtt_client_publish(
        mqtt_client,
        telemetry_topic,
        (const char*)telemetry_payload.c_str(),
        telemetry_payload.length(),
        MQTT_QOS1,
        DO_NOT_RETAIN_MSG)
      == 0) {
    Serial.println("Failed publishing");
  } else {
    Serial.println("Message published successfully");
  }
}