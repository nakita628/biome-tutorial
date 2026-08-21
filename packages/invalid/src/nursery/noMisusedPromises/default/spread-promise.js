// Using a `Promise` as an iterable expands to nothing:
const getData = () => fetch('/');
console.log({ foo: 42, ...getData() });
