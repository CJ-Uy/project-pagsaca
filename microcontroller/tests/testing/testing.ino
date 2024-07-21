void setup() {
  pinMode(A0, INPUT);
}

void loop() {
  pinMode(A0, OUTPUT);
  analogWrite(A0,255);
}
