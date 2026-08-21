import type { bar } from "./qux.ts";

export type Foo = {
  bar: typeof bar;
};
