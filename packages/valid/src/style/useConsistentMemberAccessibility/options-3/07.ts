class Animal {
  constructor(
    breed,
    name,
  ) {
    // Parameter property and constructor
    this.name = name;
  }
  animalName: string; // Property
  get name(): string {
    // get accessor
    return this.animalName;
  }
  set name(value: string) {
    // set accessor
    this.animalName = value;
  }
  walk() {
    // method
  }
}
