// Module 1 Pins
const int M1_PMFCPin = A0;
const int M1_WaterPin = A1;
const int M1_SoilMoisturePin = A2;
const int M1_LEDPin = 13;
const int M1_FanPin = 12;

// Module 2 Pins
const int M2_PMFCPin = A3;
const int M2_WaterPin = A4;
const int M2_SoilMoisturePin = A5;
const int M2_LEDPin = 11;
const int M2_FanPin = 10;

void setup() {
  Serial.begin(9600);

  // Module 1 Setup
  pinMode(M1_PMFCPin, INPUT);
  pinMode(M1_WaterPin, INPUT);
  pinMode(M1_SoilMoisturePin, INPUT);
  pinMode(M1_FanPin, OUTPUT);
  pinMode(M1_LEDPin, OUTPUT);

  // Module 2 Setups
  pinMode(M2_PMFCPin, INPUT);
  pinMode(M2_WaterPin, INPUT);
  pinMode(M2_SoilMoisturePin, INPUT);
  pinMode(M2_FanPin, OUTPUT);
  pinMode(M2_LEDPin, OUTPUT);

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
  Serial.println("----- Starting Sequence -----");

  // Module 1 
  Serial.println("\n----- Module 1 -----");
  
  Serial.print("Reading Module 1 PMFC: ");
  float M1_PMFC = getMedianOfAnalogReadings(M1_PMFCPin);
  Serial.println(M1_PMFC);

  Serial.print("Reading Module 1 Water Level: ");
  float M1_WaterLevel = getMedianOfAnalogReadings(M1_WaterPin);
  Serial.println(M1_WaterLevel);

  Serial.print("Reading Module 1 Soil Moisture: ");
  float M1_SoilMoisture = getMedianOfAnalogReadings(M1_SoilMoisturePin);
  Serial.println(M1_SoilMoisture);

  // Module 2 
  Serial.println("\n----- Module 2 -----");
  
  Serial.print("Reading Module 2 PMFC: ");
  float M2_PMFC = getMedianOfAnalogReadings(M2_PMFCPin);
  Serial.println(M2_PMFC);

  Serial.print("Reading Module 2 Water Level: ");
  float M2_WaterLevel = getMedianOfAnalogReadings(M2_WaterPin);
  Serial.println(M1_WaterLevel);

  Serial.print("Reading Module 2 Soil Moisture: ");
  float M2_SoilMoisture = getMedianOfAnalogReadings(M2_SoilMoisturePin);
  Serial.println(M2_SoilMoisture);

  // Upload data to database
  Serial.println("\n----- Uploading to Database -----");


  // Run Electroculture 5 minutes
  delay(300000); // 5 minutes delay
}

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

String uploadData(String tableName, String mdouleId, float data){
  // Send the data to the ESP32

  // Return Response


  // // Create the data json to be instered
  // String dataJSON = "{ \"moduleId\": \"" + String(moduleId) + "\", \"data\": " + String(data) + " }";
  
  // // Send to database with upsert false
  // httpCode = db.insert(tableName, dataJSON, false);

  // if (httpCode == 201) {
  //   return "SUCCESS 201"
  // } else {
  //   return "ERROR " + String(httpCode);
  // }
}
