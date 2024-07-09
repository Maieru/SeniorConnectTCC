#ifndef LITTLEFSHELPER_H_INCLUDED
#define LITTLEFSHELPER_H_INCLUDED

#include <LittleFS.h>

void initLittleFS();
String readFile(fs::FS& fs, const char* path);
void writeFile(fs::FS& fs, const char* path, const char* message);

#endif