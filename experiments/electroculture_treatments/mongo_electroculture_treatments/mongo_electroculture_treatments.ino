const int highConstPin = 11;
const int highIntervalPin = 10;
const int midConstPin = 9;
const int midIntervalPin = 6;
const int lowConstPin = 5;
const int lowIntervalPin = 3;

void setup() {
  Serial.begin(9600);

  pinMode(highConstPin, OUTPUT);
  pinMode(highIntervalPin, OUTPUT);
  pinMode(midConstPin, OUTPUT);
  pinMode(midIntervalPin, OUTPUT);
  pinMode(lowConstPin, OUTPUT);
  pinMode(lowIntervalPin, OUTPUT);
}

void loop() {
// Consistent Treatments
  analogWrite(highConstPin, map(5, 0, 5, 0, 255));
  analogWrite(midConstPin, map(3, 0, 5, 0, 255));
  analogWrite(lowConstPin, map(1, 0, 5, 0, 255));

// Interval Treatments
  // Turn on current for 5 minutes
  analogWrite(highIntervalPin, map(5, 0, 5, 0, 255));
  analogWrite(midIntervalPin, map(3, 0, 5, 0, 255));
  analogWrite(lowIntervalPin, map(1, 0, 5, 0, 255));
  delay(300000);

  // Turn off current for 25 minutes
  analogWrite(highIntervalPin, 0);
  analogWrite(midIntervalPin, 0);
  analogWrite(lowIntervalPin, 0);
  delay(3600000);
}
