// For now, this helper is being writen this way because i dont have the required hardware
// in the future, it will use an

// Includes
#include "hardwareConstants.h"
#include <arduino.h>
#include <vector>

void activateLeds(std::vector<int> ledsToBeActivated) {
  for (int i = 0; i < NUMBER_OF_DRAWNERS; i++) {
    // This part should be rewritten to use an multiplex
    digitalWrite(25, LOW);
  }

  for (int i = 0; i < NUMBER_OF_DRAWNERS; i++) {
    if (std::find(ledsToBeActivated.begin(), ledsToBeActivated.end(), i) != ledsToBeActivated.end()) {
      // This part should be rewritten
      Serial.print("Turning on led: ");
      Serial.println(i);

      if (i == 0) {
        digitalWrite(25, HIGH);
      }
    }
  }
}