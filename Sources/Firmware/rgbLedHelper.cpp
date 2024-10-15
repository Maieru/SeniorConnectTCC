// Includes
#include "rgbLedHelper.h"
#include "Arduino.h"

ledColor lastColor;

ledColor getLastColor() {
  return lastColor;
}

void setRGBLed(enum ledColor color, int pinRed, int pinGreen, int pinBlue) {
  lastColor = color;

  switch (color) {
    case OFF:
      digitalWrite(pinRed, LOW);
      digitalWrite(pinGreen, LOW);
      digitalWrite(pinBlue, LOW);
      break;
    case RED:
      digitalWrite(pinRed, HIGH);
      digitalWrite(pinGreen, LOW);
      digitalWrite(pinBlue, LOW);
      break;
    case GREEN:
      digitalWrite(pinRed, LOW);
      digitalWrite(pinGreen, HIGH);
      digitalWrite(pinBlue, LOW);
      break;
    case BLUE:
      digitalWrite(pinRed, LOW);
      digitalWrite(pinGreen, LOW);
      digitalWrite(pinBlue, HIGH);
      break;
    case YELLOW:
      digitalWrite(pinRed, HIGH);
      digitalWrite(pinGreen, HIGH);
      digitalWrite(pinBlue, LOW);
      break;
    case PINK:
      digitalWrite(pinRed, HIGH);
      digitalWrite(pinGreen, LOW);
      digitalWrite(pinBlue, HIGH);
      break;
    case CYAN:
      digitalWrite(pinRed, LOW);
      digitalWrite(pinGreen, HIGH);
      digitalWrite(pinBlue, HIGH);
      break;
    case WHITE:
      digitalWrite(pinRed, HIGH);
      digitalWrite(pinGreen, HIGH);
      digitalWrite(pinBlue, HIGH);
      break;
  }
}