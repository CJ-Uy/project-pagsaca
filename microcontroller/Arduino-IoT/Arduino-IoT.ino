#include <SoftwareSerial.h>
#include "IRremote.hpp"

// Config Values
const int readingInterval = 600000; // Every 10 Minutes
const float preferedWaterLevel = 0; // cm 
const float preferedSoilMoistureLevel = 30; // %
const float preferedElctrocultureVoltage = 0.1; // Volts
const int preferedElectrocultureLength = 300000; // 5 Minutes every 30 minutes 
const int MWaterPumpDuration = 3000; // 3 seconds
bool isAutoActionOn = false; // Control if automatic events and readings are on by default (safe for watchdog resets)

// Data Transfer Pins
const int TX_Pin = 0;
const int RX_Pin = 1;
SoftwareSerial espSerial(RX_Pin, TX_Pin);

// IR Receiver Values 
const int IR_ReceiverPin = 11;
unsigned long previousMillis = 0; // Simulate an asynchronous function
bool buttonStates[10] = {false,false,false,false,false,false,false,false,false,false}; // Save 10 button states and set them all to false first (1-9 black buttons)
const int autoStateLEDPin = 12;
bool autoState = false;

unsigned long M1_PumpStartTime = 0;
unsigned long M2_PumpStartTime = 0;
bool isPumpingM1 = false;
bool isPumpingM2 = false;

unsigned long M1_ElectrocultureTimer = 0;
unsigned long M2_ElectrocultureTimer = 0;
bool isElectrocultureActiveM1 = false;
bool isElectrocultureActiveM2 = false;

// Module 1 Pins
const int M1_PMFCPin = A0;
const int M1_WaterPin = A1;
const int M1_SoilMoisturePin = A2;
const int M1_LEDPin = 3;
const int M1_FanPin = 4;
const int M1_WaterPumpPin = 5;

// Module 2 Pins
const int M2_PMFCPin = A3;
const int M2_WaterPin = A4;
const int M2_SoilMoisturePin = A5;
const int M2_LEDPin = 6;
const int M2_FanPin = 7;
const int M2_WaterPumpPin = 8;

void setup() {
  Serial.begin(19200); // Start Console
  espSerial.begin(9600); // Communication serial with esp32

  Serial.println("HELLO");
  Serial.println("HELLO");
  Serial.println("");
  Serial.println("");
  Serial.println("");

  IrReceiver.begin(IR_ReceiverPin, ENABLE_LED_FEEDBACK); // Initialize IR receiver

  // Module 1 Setup
  pinMode(M1_PMFCPin, INPUT);
  pinMode(M1_WaterPin, INPUT);
  pinMode(M1_SoilMoisturePin, INPUT);
  pinMode(M1_FanPin, OUTPUT);
  pinMode(M1_LEDPin, OUTPUT);
  pinMode(M1_WaterPumpPin, OUTPUT);

  // Module 2 Setup
  pinMode(M2_PMFCPin, INPUT);
  pinMode(M2_WaterPin, INPUT);
  pinMode(M2_SoilMoisturePin, INPUT);
  pinMode(M2_FanPin, OUTPUT);
  pinMode(M2_LEDPin, OUTPUT);
  pinMode(M2_WaterPumpPin, OUTPUT);
  pinMode(autoStateLEDPin, OUTPUT);
}

void loop() {
  unsigned long currentMillis = millis();

  // Run inner function every 5 minutes if auto actions are on
  if (currentMillis - previousMillis >= 300000 && autoState) {
    previousMillis = currentMillis;
    
    Serial.println("----- STARTING SEQUENCE -----");



    // ----- SENSOR READING ----- // 

    // Module 1 
    Serial.println("\n----- Reading Module 1 -----");
    
    Serial.print("Reading Module 1 PMFC: ");
    float M1_PMFC = floatMap(getMedianOfAnalogReadings(M1_PMFCPin), 0, 1023, 0, 5); // Idk why it doesnt go down to 0
    Serial.println(String(M1_PMFC) + "V");

    Serial.print("Reading Module 1 Water Level: ");
    float M1_WaterLevel = floatMap(getMedianOfAnalogReadings(M1_WaterPin), 6, 1023, 0, 4); // 6 to 1023 Analog Read to 0 to 4 cm 
    Serial.println(String(M1_WaterLevel) + " cm");

    Serial.print("Reading Module 1 Soil Moisture: ");
    float M1_SoilMoisture = floatMap(getMedianOfAnalogReadings(M1_SoilMoisturePin), 1013, 7, 0, 100); // 1013 to 7 Analog Read to 0 to 100 %
    Serial.println(String(M1_SoilMoisture) + " %");

    // Module 2
    Serial.println("\n----- Reading Module 2 -----");
    
    Serial.print("Reading Module 2 PMFC: ");
    float M2_PMFC = floatMap(getMedianOfAnalogReadings(M2_PMFCPin), 0, 1023, 0, 5); // Idk why it doesnt go down to 0
    Serial.println(String(M2_PMFC) + "V");

    Serial.print("Reading Module 2 Water Level: ");
    float M2_WaterLevel = floatMap(getMedianOfAnalogReadings(M2_WaterPin), 6, 1023, 0, 4); // 6 to 1023 Analog Read to 0 to 4 cm 
    Serial.println(String(M2_WaterLevel) + " cm");

    Serial.print("Reading Module 2 Soil Moisture: ");
    float M2_SoilMoisture = floatMap(getMedianOfAnalogReadings(M2_SoilMoisturePin), 1013, 7, 0, 100); // 1013 to 7 Analog Read to 0 to 100 %
    Serial.println(String(M2_SoilMoisture) + " %");

    // Send data to ESP32 for it to upload to SupaBase
    Serial.println("\n----- Sending to ESP32 -----");
    espSerial.print("DATA:");
    // Send Module 1
    espSerial.print(M1_PMFC);
    espSerial.print(",");
    espSerial.print(M1_WaterLevel);
    espSerial.print(",");
    espSerial.print(M1_SoilMoisture);
    espSerial.println("");
    // Send Module 2
    espSerial.print(M2_PMFC);
    espSerial.print(",");
    espSerial.print(M2_WaterLevel);
    espSerial.print(",");
    espSerial.print(M2_SoilMoisture);
    espSerial.println("");

    // ----- END of SENSOR READING ----- //



    // ----- EVENTS ----- //

    // ---- Watering Event ---- //
    // Module 1 START Watering
    if ((M1_WaterLevel < preferedSoilMoistureLevel || M1_SoilMoisture < preferedSoilMoistureLevel) && !isPumpingM1) {
      Serial.println("Starting to water Module 1...");
      turnOffLightsAndFans();
      // Turn on water pump
      digitalWrite(M1_WaterPumpPin, HIGH);
      isPumpingM1 = true;
      M1_PumpStartTime = currentMillis;
      // Communicate event to ESP32 
      espSerial.print("EVENT:");
      espSerial.println("M1-Watering");
    }
    // Module 2 START Watering
    if ((M2_WaterLevel < preferedSoilMoistureLevel || M2_SoilMoisture < preferedSoilMoistureLevel) && !isPumpingM2) {
      Serial.println("Starting to water Module 2...");
      turnOffLightsAndFans();
      // Turn on water pump
      digitalWrite(M2_WaterPumpPin, HIGH);
      isPumpingM2 = true;
      M2_PumpStartTime = currentMillis;
      // Communicate event to ESP32 
      espSerial.print("EVENT:");
      espSerial.println("M2-Watering");
    }

    // Check and stop Watering event if necessary
    // Module 1 STOP Watering
    if (isPumpingM1 && (currentMillis - M1_PumpStartTime >= MWaterPumpDuration)) {
      // Turn off pump
      digitalWrite(M1_WaterPumpPin, LOW);
      turnOnLightsAndFansBasedOnButtonStates();
      isPumpingM1 = false;
      Serial.println("Finished watering Module 1");
    }
    // Module 2 STOP Watering
    if (isPumpingM2 && (currentMillis - M2_PumpStartTime >= MWaterPumpDuration)) {
      // Turn off pump
      digitalWrite(M2_WaterPumpPin, LOW);
      turnOnLightsAndFansBasedOnButtonStates();
      isPumpingM2 = false;
      Serial.println("Finished watering Module 2");
    }

    // ---- END of Watering Event ---- //


    // ---- Electroculture Event ---- //
    // Start Electroculture voltage application
    // Module 1 Electroculture
    if (!isElectrocultureActiveM1) {
      Serial.println("Starting PMFC voltage for Module 1");
      pinMode(M1_PMFCPin, OUTPUT);
      digitalWrite(M1_PMFCPin, HIGH);
      isElectrocultureActiveM1 = true;
      M1_ElectrocultureTimer = currentMillis;
      
      // Communicate event to ESP32 
      espSerial.print("EVENT:");
      espSerial.println("M1-Electroculture");
    }
    // Module 2 Electroculture
    if (!isElectrocultureActiveM2) {
      Serial.println("Starting PMFC voltage for Module 2");
      pinMode(M2_PMFCPin, OUTPUT);
      digitalWrite(M2_PMFCPin, HIGH);
      isElectrocultureActiveM2 = true;
      M2_ElectrocultureTimer = currentMillis;
      
      // Communicate event to ESP32 
      espSerial.print("EVENT:");
      espSerial.println("M2-Electroculture");
    }

    // Check and stop PMFC voltage if necessary
    // Module 1
    if (isElectrocultureActiveM1 && (currentMillis - M1_ElectrocultureTimer >= preferedElectrocultureLength)) {
      pinMode(M1_PMFCPin, INPUT);
      isElectrocultureActiveM1 = false;
      Serial.println("Finished Electroculture for Module 1");
    }
    // Module 2
    if (isElectrocultureActiveM2 && (currentMillis - M2_ElectrocultureTimer >= preferedElectrocultureLength)) {
      pinMode(M2_PMFCPin, INPUT);
      isElectrocultureActiveM2 = false;
      Serial.println("Finished Electroculture for Module 2");
    }
  }

  // If IR remote was clicked
  if (IrReceiver.decode()) {
    uint16_t command = IrReceiver.decodedIRData.command;
    Serial.println(command);
    switch (command) {
      // Row 1
      case 69: // CH-
        break;
      case 70: // CH
        break;
      case 71: // CH+
        break;
      
      // Row 2
      case 68: // |<<
        break;
      case 64: // >>|
        break;
      case 67: // >||
        break;
      
      // Row 3
      case 7: // - - Turn off 220V pump
        // Code in second ESP32
        break;
      case 21: // + - Turn on 220V pump
        // Code in second ESP32
        break;
      case 9: // EQ
        break;

      // Row 4
      case 22: // 0 - Turn AUTO Actions OFF
        autoState = false;
        digitalWrite(autoStateLEDPin, LOW);
        break;
      case 25: // 100+ - Turn AUTO Actions ON
        autoState = true;
        digitalWrite(autoStateLEDPin, HIGH);
        break;
      case 13: // 200+
        break;
      
      // Column 1 - Module 1 Controls
      case 12: // 1 - Lights
        if(!buttonStates[1]){
          digitalWrite(M1_LEDPin, HIGH);
          buttonStates[1] = true;
        } else {
          digitalWrite(M1_LEDPin, LOW);
          buttonStates[1] = false;
        }
        break;
      case 8: // 4 - Fan
        if(!buttonStates[4]){
          digitalWrite(M1_FanPin, HIGH);
          buttonStates[4] = true;
        } else {
          digitalWrite(M1_FanPin, LOW);
          buttonStates[4] = false;
        }
        break;
      case 66: // 7 - Water Pump
        if(!buttonStates[7]){
          buttonStates[7] = true;
          turnOffLightsAndFans();
          digitalWrite(M1_WaterPumpPin, HIGH);
        } else {
          buttonStates[7] = false;
          turnOnLightsAndFansBasedOnButtonStates();
          digitalWrite(M1_FanPin, LOW);
        }
        break;
      
      // Column 2 - Module 2 Controls
      case 24: // 2 - Lights
        if(!buttonStates[2]){
          digitalWrite(M2_LEDPin, HIGH);
          buttonStates[1] = true;
        } else {
          digitalWrite(M2_LEDPin, LOW);
          buttonStates[2] = false;
        }
        break;
      case 28: // 5 - Fan
        if(!buttonStates[5]){
          digitalWrite(M2_FanPin, HIGH);
          buttonStates[5] = true;
        } else {
          digitalWrite(M2_FanPin, LOW);
          buttonStates[5] = false;
        }
        break;
      case 82: // 8 - Pump
        if (!buttonStates[8]){
          buttonStates[8] = true;
          turnOffLightsAndFans();
          digitalWrite(M2_WaterPumpPin, HIGH);
        } else {
          buttonStates[8] = false;
          turnOnLightsAndFansBasedOnButtonStates();
          digitalWrite(M2_FanPin, LOW);
        }
        break;
      
      // Column 3 - Both Module Controls
      case 94: // 3 - Lights
        if(!buttonStates[3]){
          digitalWrite(M1_LEDPin, HIGH);
          digitalWrite(M2_LEDPin, HIGH);
          buttonStates[1] = true;
          buttonStates[2] = true;
          buttonStates[3] = true;
        } else {
          digitalWrite(M1_LEDPin, LOW);
          digitalWrite(M2_LEDPin, LOW);
          buttonStates[1] = false;
          buttonStates[2] = false;
          buttonStates[3] = false;
        }
        break;
      case 90: // 6 - Fan
        if(!buttonStates[6]){
          digitalWrite(M1_FanPin, HIGH);
          digitalWrite(M2_FanPin, HIGH);
          buttonStates[4] = true;
          buttonStates[5] = true;
          buttonStates[6] = true;
        } else {
          digitalWrite(M1_FanPin, LOW);
          digitalWrite(M2_FanPin, LOW);
          buttonStates[4] = false;
          buttonStates[5] = false;
          buttonStates[6] = false;
        }
        break;
      case 74: // 9 - Pump
        if (!buttonStates[9]){
          Serial.println("TURN  PUMP ON");
          turnOffLightsAndFans();
          digitalWrite(M1_WaterPumpPin, HIGH);
          digitalWrite(M2_WaterPumpPin, HIGH);
          buttonStates[7] = true;
          buttonStates[8] = true;
          buttonStates[9] = true;
        } else {
          Serial.println("TURN  PUMP OFF");
          digitalWrite(M1_FanPin, LOW);
          digitalWrite(M2_FanPin, LOW);
          turnOnLightsAndFansBasedOnButtonStates();
          buttonStates[7] = false;
          buttonStates[8] = false;
          buttonStates[9] = false;
        }
        break;
    }
    delay(100);  // wait a bit
    IrReceiver.resume();
  }
}



// ----- UTILITY FUNCTIONS ----- //



float getMedianOfAnalogReadings(int pin){
  int readings[30];
  
  // Collect n readings
  for (int i = 0 ; i < 30 ; i++){
    readings[i] = analogRead(pin);
  }

  // Sort using insertion sort for least memory and highest performance with low item list
  insertionSort(readings, 30);

 // Return the median value
  return (readings[15] + readings[16])/2;
}

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Move elements of arr[0..i-1], that are greater than key,
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

float floatMap(int num, int old_min, int old_max, int new_min, int new_max){
  return (float)(num - old_min) * (new_max - new_min) / (old_max - old_min) + new_min;
}

void turnOffLightsAndFans() {
// Turn off lights and fans
  digitalWrite(M1_LEDPin, LOW);
  digitalWrite(M1_FanPin, LOW);
  digitalWrite(M2_LEDPin, LOW);
  digitalWrite(M2_FanPin, LOW);
}

void turnOnLightsAndFansBasedOnButtonStates() {
  for (int i = 0; i < 10; i++){
    switch (i) {
      case 1:
        if (buttonStates[i])
          digitalWrite(M1_LEDPin, HIGH);
        else
          digitalWrite(M1_LEDPin, LOW);
        break;
      case 2:
        if (buttonStates[i])
          digitalWrite(M2_LEDPin, HIGH);
        else
          digitalWrite(M2_LEDPin, LOW);
        break;
      case 4:
        if (buttonStates[i])
          digitalWrite(M1_FanPin, HIGH);
        else
          digitalWrite(M1_FanPin, LOW);
        break;
      case 5:
        if (buttonStates[i])
          digitalWrite(M2_FanPin, HIGH);
        else
          digitalWrite(M2_FanPin, LOW);
        break;
    }
  }
}