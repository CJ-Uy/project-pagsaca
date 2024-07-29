#include <Arduino.h>
#include <ESP32_Supabase.h>
#include <WiFi.h>
#include <ArduinoJson.h>

Supabase db;
HTTPClient https;
WiFiClientSecure client;

// put your WiFi credentials (SSID and Password) here
const char *ssid = "CJ-Uy";
const char *psswd = "1234567890";

const String module_1_id = "cly1ihlcx0004mx9gsjt4u0xj";
const String module_2_id = "cly1ol58e0000sotnmkntia7k"; 

const String supabase_url = "https://dkecsjreyxhkpoomydze.supabase.co";
const String annon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZWNzanJleXhoa3Bvb215ZHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4NjkzNTIsImV4cCI6MjAzNDQ0NTM1Mn0.POhjqUdTsCpQ02pWq-mP1ZwYfuWmaApckavxrG5PbXU";

void setup() {
  Serial.begin(9600);
  Serial2.begin(9600); // For communication with Arduino
  
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
}

void loop() {
  if (Serial2.available()) {
    String receivedData = Serial2.readStringUntil('\n');
    receivedData.trim();
    
    if (receivedData.startsWith("DATA:")) {
      processData(receivedData.substring(5));
    } else if (receivedData.startsWith("EVENT:")) {
      processEvent(receivedData.substring(6));
    }
  }
}

void processData(String data) {
  int firstComma = data.indexOf(',');
  int secondComma = data.indexOf(',', firstComma + 1);
  int thirdComma = data.indexOf(',', secondComma + 1);
  
  if (firstComma != -1 && secondComma != -1 && thirdComma != -1) {
    float M1_PMFC = data.substring(0, firstComma).toFloat();
    float M1_WaterLevel = data.substring(firstComma + 1, secondComma).toFloat();
    float M1_SoilMoisture = data.substring(secondComma + 1, thirdComma).toFloat();
    float M2_PMFC = data.substring(thirdComma + 1, data.indexOf(',', thirdComma + 1)).toFloat();
    float M2_WaterLevel = data.substring(data.indexOf(',', thirdComma + 1) + 1, data.lastIndexOf(',')).toFloat();
    float M2_SoilMoisture = data.substring(data.lastIndexOf(',') + 1).toFloat();
    
    uploadData("voltageData", module_1_id, M1_PMFC);
    uploadData("voltageData", module_2_id, M2_PMFC);
    uploadData("waterLevelData", module_1_id, M1_WaterLevel);
    uploadData("waterLevelData", module_2_id, M2_WaterLevel);
    uploadData("soilMoistureData", module_1_id, M1_SoilMoisture);
    uploadData("soilMoistureData", module_2_id, M2_SoilMoisture);
  }
}

void processEvent(String event) {
  String dataJSON = "{ \"moduleId\": \"" + (event.startsWith("M1") ? module_1_id : module_2_id) + "\", \"event\": \"" + event + "\" }";
  int httpCode = db.insert("activityLog", dataJSON, false);
  if (httpCode == 201) {
    Serial.println("Successfully logged event: " + event);
  } else {
    Serial.println("Failed to log event. Error code: " + String(httpCode));
  }
}

void uploadData(String tableName, String moduleId, float data) {
  String dataJSON = "{ \"moduleId\": \"" + moduleId + "\", \"data\": " + String(data) + " }";
  int httpCode = db.insert(tableName, dataJSON, false);
  if (httpCode == 201) {
    Serial.println("Successfully uploaded data to " + tableName);
  } else {
    Serial.println("Failed to upload data to " + tableName + ". Error code: " + String(httpCode));
  }
}