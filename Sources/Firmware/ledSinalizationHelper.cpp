// For now, this helper is being writen this way because i dont have the required hardware
// in the future, it will use an

// Includes
#include "hardwareConstants.h"
#include <arduino.h>
#include <vector>

void initializeSinalizationLeds() {
  pinMode(REGISTER_CLEAR, OUTPUT);
  pinMode(REGISTER_CLOCK, OUTPUT);
  pinMode(REGISTER_2_INPUT, OUTPUT);
  pinMode(REGISTER_1_INPUT, OUTPUT);

  digitalWrite(REGISTER_CLOCK, LOW);
  digitalWrite(REGISTER_CLEAR, HIGH);
}

void activateLeds(std::vector<int> ledsToBeActivated) {
  digitalWrite(REGISTER_CLEAR, LOW);
  digitalWrite(REGISTER_CLEAR, HIGH);
  digitalWrite(REGISTER_CLOCK, LOW);

  String ledStateFirstRegister;
  String ledStateSecondRegister;

  for (int i = 0; i < NUMBER_OF_OUTPUTS_REGISTER; i++) {
    if (std::find(ledsToBeActivated.begin(), ledsToBeActivated.end(), i) != ledsToBeActivated.end()) {
      ledStateFirstRegister = "1" + ledStateFirstRegister;
    } else {
      ledStateFirstRegister = "0" + ledStateFirstRegister;
    }
  }

  for (int i = NUMBER_OF_OUTPUTS_REGISTER; i < 2 * NUMBER_OF_OUTPUTS_REGISTER; i++) {
    if (std::find(ledsToBeActivated.begin(), ledsToBeActivated.end(), i) != ledsToBeActivated.end()) {
      ledStateSecondRegister = "1" + ledStateSecondRegister;
    } else {
      ledStateSecondRegister = "0" + ledStateSecondRegister;
    }
  }

  Serial.print("led string 1: ");
  Serial.println(ledStateFirstRegister);
  Serial.print("led string 2: ");
  Serial.println(ledStateSecondRegister);

  for (int i = 0; i < NUMBER_OF_OUTPUTS_REGISTER; i++) {
    digitalWrite(REGISTER_CLOCK, LOW);
    digitalWrite(REGISTER_1_INPUT, LOW);
    digitalWrite(REGISTER_2_INPUT, LOW);

    if (ledStateFirstRegister[i] == '1') {
      digitalWrite(REGISTER_1_INPUT, HIGH);
    }

    if (ledStateSecondRegister[i] == '1') {
      digitalWrite(REGISTER_2_INPUT, HIGH);
    }

    digitalWrite(REGISTER_CLOCK, HIGH);
  }

  digitalWrite(REGISTER_CLOCK, LOW);
}

void deactivateLeds() {
  digitalWrite(REGISTER_CLEAR, LOW);
  digitalWrite(REGISTER_CLEAR, HIGH);
}