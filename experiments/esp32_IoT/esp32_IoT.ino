#include <Arduino.h>
#include <ESP32_Supabase.h>
#include <WiFi.h>
#include <ArduinoJson.h>

Supabase db;
HTTPClient https;
WiFiClientSecure client;

// Put your supabase URL and Anon key here...
// Because Login already implemented, there's no need to use secretrole key
String supabase_url = "https://dkecsjreyxhkpoomydze.supabase.co";
String annon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZWNzanJleXhoa3Bvb215ZHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4NjkzNTIsImV4cCI6MjAzNDQ0NTM1Mn0.POhjqUdTsCpQ02pWq-mP1ZwYfuWmaApckavxrG5PbXU";

// put your WiFi credentials (SSID and Password) here
const char *ssid = "PLDTHOMEFIBRz8Qe6_Guest";
const char *psswd = "Decodeco2";

const int waterSensorPin = 35; 
const int waterPumpRelaySwitch = 32;

void setup() {
  Serial.begin(9600);
  Serial.println("");
  pinMode(waterSensorPin, INPUT);
  pinMode(waterPumpRelaySwitch, OUTPUT);

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
  // Reading Water Sensor
  int waterLevel = analogRead(waterSensorPin);
  Serial.print("Reading from water sensor: ");
  Serial.println(waterLevel);

  if(waterLevel < 1500){
    Serial.println("Water Level INSUFFICIENT");
    // Turn pump on
    Serial.println("Turning Pump On...");
    digitalWrite(waterPumpRelaySwitch, HIGH);
    delay(3000); // set how long the pump should be on
    digitalWrite(waterPumpRelaySwitch, LOW);
    Serial.println("Turning Pump Off...");
  } else {
    Serial.println("Water Level Sufficient");
  }

  // Upload this data to the database
  Serial.println("Attempting to insert data to database... ");
    // Uploading it to the module 1 id
  
  String waterLevelData = "{ \"moduleId\": \"cly1ihlcx0004mx9gsjt4u0xj\", \"data\": " + String(waterLevel) + " }";

  // Insert operation
  int httpCode = db.insert("waterLevelData", waterLevelData, false);

  if (httpCode == 201) {
    Serial.println("Successfully Uploaded code: 201");
    Serial.println("Starting 5 minute Delay");
    delay(300000); // Delaying loop for 5 minutes
  } else {
    Serial.print("Failed to Upload Error Code: ");
    Serial.println(httpCode);
    Serial.println("Retrying...");
    delay(5000);    
  }
  Serial.println(" ");
  Serial.println(" ");
  Serial.println(" ");
}