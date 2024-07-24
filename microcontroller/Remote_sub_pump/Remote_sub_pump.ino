#include "IRremote.hpp"

void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  IrReceiver.begin(13 , ENABLE_LED_FEEDBACK);  
  digitalWrite(2, LOW);
}

void loop() {
  if (IrReceiver.decode()) {
    uint16_t command = IrReceiver.decodedIRData.command;
    switch (command){
      case 7:
        digitalWrite(2, LOW);
        break;
      case 21:
        digitalWrite(2, HIGH);
        break;
    }
    delay(100);
    IrReceiver.resume();
  }
}
