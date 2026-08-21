// A lone `$` before a single expression is treated as intentional (e.g. a price).
function MyComponent({ price }) {
  return <div>${price}</div>;
}
