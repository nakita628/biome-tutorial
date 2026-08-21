interface MixedMembers {
  a: number;
  b: string;
  y: boolean;
  z: string;
  (): void;  // Non-sortable members remain in original order
  new (): MixedMembers;
  [key: string]: any;
}
