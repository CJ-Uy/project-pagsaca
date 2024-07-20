#include <Arduino.h>
#include <ESP32_Supabase.h>
#include <WiFi.h>
#include <ArduinoJson.h>

Supabase db;
HTTPClient https;
WiFiClientSecure client;

// put your WiFi credentials (SSID and Password) here
const char *ssid = "PLDTHOMEFIBRz8Qe6_Guest";
const char *psswd = "Decodeco2";

const int waterSensorPinM1 = 35; 
const int waterPumpRelaySwitchM1 = 32;
const int waterSensorPinM2 = 33; 
const int waterPumpRelaySwitchM2 = 25;

const int voltagePinM1 = 19; 
const int voltagePinM2 = 21;

const String module_1_id = "cly1ihlcx0004mx9gsjt4u0xj";
const String module_2_id = "cly1ol58e0000sotnmkntia7k"; 

const String supabase_url = "https://dkecsjreyxhkpoomydze.supabase.co";
const String annon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZWNzanJleXhoa3Bvb215ZHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4NjkzNTIsImV4cCI6MjAzNDQ0NTM1Mn0.POhjqUdTsCpQ02pWq-mP1ZwYfuWmaApckavxrG5PbXU";

void setup() {
  Serial.begin(9600);
  Serial.println("");
  pinMode(waterSensorPinM1, INPUT);
  pinMode(waterPumpRelaySwitchM1, OUTPUT);

  // Connecting to Wi-Fi
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, psswd);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print(".");
  }
  Serial.println("Connected!");

  db.begin(supabase_url, annon_key);
  Serial.println(" ");
  Serial.println(" ");
  Serial.println(" ");
}

void loop() {
  // Reading Water Sensor
  int waterLevelM1 = analogRead(waterSensorPinM1);
  int waterLevelM2 = analogRead(waterSensorPinM2);

  float voltageM1 = analogRead(voltagePinM1);
  float voltageM2 = analogRead(voltagePinM2);

  Serial.print("Reading from water sensor: ");
  Serial.println(waterLevelM1);

  // Water Pump check in Module 1 
  if(waterLevelM1 < 1500){
    Serial.println("Water Level INSUFFICIENT in Module 1");
    // Turn pump on
    Serial.println("Turning Pump On for Module 1...");
    digitalWrite(waterPumpRelaySwitchM1, HIGH);
    delay(3000); // set how long the pump should be on
    digitalWrite(waterPumpRelaySwitch, LOW);
    Serial.println("Turning Pump Off for Module 1...");
  } else {
    Serial.println("Water Level Sufficient in Module 1");
  }

  // Water Pump check in Module 2
  if(waterLevelM2 < 1500){
    Serial.println("Water Level INSUFFICIENT in Module 2");
    // Turn pump on
    Serial.println("Turning Pump On for Module 2...");
    digitalWrite(waterPumpRelaySwitchM1, HIGH);
    delay(3000); // set how long the pump should be on
    digitalWrite(waterPumpRelaySwitch, LOW);
    Serial.println("Turning Pump Off for Module 2...");
  } else {
    Serial.println("Water Level Sufficient in Module 2");
  }

  // Upload this data to the database
  Serial.println("Attempting to insert data to database... ");
    // Uploading it to the module 1 id
  
  String waterLevelDataM1 = "{ \"moduleId\": \"" + String(module_1_id) + "\", \"data\": " + String(waterLevelM1) + " }";
  String waterLevelDataM1 = "{ \"moduleId\": \"" + String(module_2_id) + "\", \"data\": " + String(waterLevelM2) + " }";
  String voltageDataM1 = "{ \"moduleId\": \"cly1ihlcx0004mx9gsjt4u0xj\", \"data\": " + String(voltageM1) + " }";
  String voltageDataM2 = "{ \"moduleId\": \"cly1ihlcx0004mx9gsjt4u0xj\", \"data\": " + String(voltageM2) + " }";

  // Insert operation
  int httpCode

  httpCode = db.insert("waterLevelData", waterLevelDataM1, false);
  if (httpCode == 201) {
    Serial.println("Successfully Uploaded Module 1 Water Data");
  } else {
    Serial.print("Failed to Upload Error Code: ");
    Serial.println(httpCode);
  }

  httpCode = db.insert("waterLevelData", waterLevelDataM1, false);
  if (httpCode == 201) {
    Serial.println("Successfully Uploaded Module 2 Water Data");
  } else {
    Serial.print("Failed to Upload Error Code: ");
    Serial.println(httpCode);
  }

  httpCode = db.insert("waterLevelData", voltageDataM1, false);
  if (httpCode == 201) {
    Serial.println("Successfully Uploaded Module 1 Water Data");
  } else {
    Serial.print("Failed to Upload Error Code: ");
    Serial.println(httpCode);
  }

  httpCode = db.insert("waterLevelData", voltageDataM2, false);
  if (httpCode == 201) {
    Serial.println("Successfully Uploaded Module 2 Water Data");
  } else {
    Serial.print("Failed to Upload Error Code: ");
    Serial.println(httpCode);
  }
  Serial.println("Starting 5 Minute Delay");
  
  Serial.println(" ");
  Serial.println(" ");
  Serial.println(" ");

  delay(300000);
}