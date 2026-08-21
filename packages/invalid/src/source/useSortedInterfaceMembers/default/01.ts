interface MixedMembers {
  z: string;
  a: number;
  (): void;  // Call signature
  y: boolean;
  new (): MixedMembers;  // Construct signature
  b: string;
  [key: string]: any;  // Index signature
}
