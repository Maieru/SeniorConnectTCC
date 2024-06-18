#define POWER_LED 13
#define STATUS_LED 12
#define RESET_BUTTON 14

void setup() {
  Serial.begin(115200);
  pinMode(POWER_LED, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);
  pinMode(RESET_BUTTON, INPUT);
}

void loop() {    
  Serial.println(digitalRead(RESET_BUTTON));
  digitalWrite(POWER_LED, digitalRead(RESET_BUTTON));
  digitalWrite(STATUS_LED, digitalRead(RESET_BUTTON));
}
