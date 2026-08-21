class A {
  fooA(s: string): void;
  fooA(n: number): void;
  fooA(sn: string | number): void {}
  barA(): void {}
}
