const int const1 = 12;
const int const2 = 27;
const int const3 = 25;
const int const4 = 32;
const int const5 = 33;

const int inter1 = 15;
const int inter2 = 4;
const int inter3 = 5;
const int inter4 = 19;
const int inter5 = 22;

void setup() {
  pinMode(const1, OUTPUT);
  pinMode(const2, OUTPUT);
  pinMode(const3, OUTPUT);
  pinMode(const4, OUTPUT);
  pinMode(const5, OUTPUT);
  
  pinMode(inter1, OUTPUT);
  pinMode(inter2, OUTPUT);
  pinMode(inter3, OUTPUT);
  pinMode(inter4, OUTPUT);
  pinMode(inter5, OUTPUT);
}

void loop() {
  delay(100);

// Consistent Treatments
  analogWrite(const1, 26); // 0.5 V
  analogWrite(const2, 83); // 1.625 V
  analogWrite(const3, 140); // 2.75 V
  analogWrite(const4, 198); // 3.875 V
  analogWrite(const5, 255); // 5 V


// Interval Treatments
  // Turn on current for 5 minutes
  analogWrite(inter1, 26); // 0.5 V
  analogWrite(inter2, 83); // 1.625 V
  analogWrite(inter3, 140); // 2.75 V
  analogWrite(inter4, 198); // 3.875 V
  analogWrite(inter5, 255); // 5 V
  delay(300000);

  // Turn off current for 1 hour
  analogWrite(inter1, 0); // 0.5 V
  analogWrite(inter2, 0); // 1.625 V
  analogWrite(inter3, 0); // 2.75 V
  analogWrite(inter4, 0); // 3.875 V
  analogWrite(inter5, 0); // 5 V
  delay(3600000);
}
