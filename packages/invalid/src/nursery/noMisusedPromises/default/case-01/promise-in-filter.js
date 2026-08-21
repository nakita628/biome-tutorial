// The following filter has no effect:
const promise = Promise.resolve('value');
[1, 2, 3].filter(() => promise);
