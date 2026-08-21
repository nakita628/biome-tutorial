// the outer function returns an inner function that has a `void` return type
var arrowFn = () => {
  return (): void => { };
}
