class Animal {
  constructor( // Invalid: Missing accessibility modifier
    public breed,
    name,
  ) {
    this.animalName = name;
  }
  private animalName: string; // OK: Modifier must be present
  public get name(): string { // OK: Modifier must be present
    return this.animalName;
  }
  public set name(value: string) { // OK: Modifier must be present
    this.animalName = value;
  }
  protected walk() { // OK: Modifier must be present
    // ...
  }
}
