function fn(bar?: { n: number }) {
  return bar!?.n;
}
