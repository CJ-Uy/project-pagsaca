int testPins[] = {15,2,4,5,19,21,22,23};

void setup() {
  Serial.begin(9600);

  // 2,4,5,13,14,15,16,17,18,19,21,22,23,25,26,27,32,33
  // Input only 3, 34, 35, 36, 39
  // (12 - output only) 
  
  //Bottom
  //RX2
  //TX2
  //AX0
  //TX0
  // D2, D3, D0, D1
  // D34 D35 CANNOT PWM
  // PWM is 0 to 65535
  // Analog Read 0 to 4095

  for (int i = 0; i < sizeof(testPins) / sizeof(testPins[0]); i++){
    pinMode(testPins[i], INPUT);
    // digitalWrite(testPins[i], HIGH);
  }

  for (int i = 0; i < sizeof(testPins) / sizeof(testPins[0]); i++){
    Serial.println(testPins[i]);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
}
