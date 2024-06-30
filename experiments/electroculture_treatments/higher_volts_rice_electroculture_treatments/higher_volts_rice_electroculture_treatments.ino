const int constant5v = 11;
const int constant4v = 6;

const int inter5v = 10;
const int inter4v = 5;


void setup() {
  pinMode(constant5v, OUTPUT);
  pinMode(constant4v, OUTPUT);
  
  pinMode(inter5v, OUTPUT);
  pinMode(inter4v, OUTPUT);

// Consistent Treatments
  digitalWrite(constant5v, HIGH); // 5 V
  analogWrite(constant4v, 204); // 4 V
}

void loop() {


// Interval Treatments
  // Turn on current for 5 minutes
  analogWrite(inter5v, 255); // 5 V
  analogWrite(inter4v, 204); // 4 V
  delay(300000);

  // Turn off current for 1 hour
  analogWrite(inter5v, 0); // 0 V
  analogWrite(inter4v, 0); // 0 V
  delay(3300000);
}