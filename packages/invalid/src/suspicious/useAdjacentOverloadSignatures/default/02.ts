interface Foo {
  foo_interface(s: string): void;
  foo_interface(n: number): void;
  bar_interface(): void;
  foo_interface(sn: string | number): void;
}
