class Animal {
  constructor(
    private breed,
    name,
  ) {
    this.animalName = name;
  }
  private animalName: string; // Property
  get name(): string {
    // get accessor
    return this.animalName;
  }
  set name(value: string) {
    // set accessor
    this.animalName = value;
  }
  protected walk() {
    // method
  }
}
