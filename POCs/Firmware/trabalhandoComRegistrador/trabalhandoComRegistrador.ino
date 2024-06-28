#define REGISTER_CLEAR 27
#define REGISTER_CLOCK 14
#define REGISTER_2_INPUT 12
#define REGISTER_1_INPUT 13

#define TEST_LED 21

void setup() {
  Serial.begin(115200);

  pinMode(TEST_LED, OUTPUT);
  digitalWrite(TEST_LED, HIGH);

  pinMode(REGISTER_CLEAR, OUTPUT);
  pinMode(REGISTER_CLOCK, OUTPUT);
  pinMode(REGISTER_2_INPUT, OUTPUT);
  pinMode(REGISTER_1_INPUT, OUTPUT);

  digitalWrite(REGISTER_CLEAR, HIGH);
}

void loop() {
  for (int i = 0; i < 8; i++) {
    Serial.write("Entrei no loop");
    digitalWrite(REGISTER_CLOCK, LOW);
    digitalWrite(REGISTER_1_INPUT, HIGH);
    digitalWrite(REGISTER_2_INPUT, HIGH);
    digitalWrite(REGISTER_CLOCK, HIGH);
    delay(200);
  }
  
}
