#include "hardwareConstants.h"
#include <arduino.h>
#include "pitches.h"

#define EMPTY_NOTE 8976

int currentStep = 0;
long lastMillis = 0;
bool songEnabled = false;

int melody[] = {
  NOTE_E5,
  NOTE_D5,
  EMPTY_NOTE
  // NOTE_FS4,
  // NOTE_GS4,
  // NOTE_CS5,
  // NOTE_B4,
  // NOTE_D4,
  // NOTE_E4,
  // NOTE_B4,
  // NOTE_A4,
  // NOTE_CS4,
  // NOTE_E4,
  // NOTE_A4,
};

int durations[] = {
  4, 4, 2
  // 4, 4, 8, 8, 4, 4,
  // 8, 8, 4, 4, 2
};

void initializeBuzzer() {
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
}

void playSong() {
  int noteDuration = 1000 / durations[currentStep];
  songEnabled = true;

  if (millis() > lastMillis + noteDuration * 1.1) {
    if (melody[currentStep] != EMPTY_NOTE) {
      tone(BUZZER_PIN, melody[currentStep], noteDuration);
    }
    currentStep += 1;
    lastMillis = millis();

    if (currentStep == sizeof(durations) / sizeof(int)) {
      currentStep = 0;
    }
  }
}

void stopSong() {
  if (songEnabled) {
    Serial.println("Stopping song");
    songEnabled = false;
    noTone(BUZZER_PIN);
    currentStep = 0;
  }
}