int const PIN_SENSOR = 13;
int const PIN_LED = 32;
void setup() {
  pinMode(PIN_SENSOR, INPUT);
  pinMode(PIN_LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int sensorState = digitalRead(PIN_SENSOR); 
  Serial.println(sensorState);
  digitalWrite(PIN_LED, sensorState);
  delay(10);
}
