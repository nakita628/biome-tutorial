// This sets `foo`'s prototype to `null` (similar to `Object.create`), and is
// well-defined across browsers.
const foo = {
  __proto__: null,
  a: 1,
}
