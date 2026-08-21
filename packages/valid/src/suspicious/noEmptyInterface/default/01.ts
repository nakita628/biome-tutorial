interface A {
  prop: string;
}

// Allow empty interfaces that extend a type.
interface B extends A {}

// Allow empty interfaces in ambient modules
declare module "mod" {
  interface C {}
}
