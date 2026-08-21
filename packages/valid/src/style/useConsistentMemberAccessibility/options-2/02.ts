class Animal {
  public constructor(
    public breed,
    name,
  ) {
    // Parameter property and constructor
    this.animalName = name;
  }
  private animalName: string; // Property
  public get name(): string {
    // get accessor
    return this.animalName;
  }
  public set name(value: string) {
    // set accessor
    this.animalName = value;
  }
  protected walk() {
    // method
  }
}
