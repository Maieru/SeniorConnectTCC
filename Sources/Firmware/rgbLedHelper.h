#ifndef RGBLEDHELPER_H_INCLUDED
#define RGBLEDHELPER_H_INCLUDED

enum ledColor {
  OFF,
  RED,
  GREEN,
  BLUE,
  YELLOW,
  PINK,
  CYAN,
  WHITE,
};

void setRGBLed(enum ledColor, int pinRed, int pinGreen, int pinBlue);
ledColor getLastColor();

#endif