async function fetchData() {
  const response = await fetch('/data');
  const data = await response.json();
  return data;
}

// This rule does not warn about non-async functions
function processData() {
  return compute(data);
}

// Nor does it warn about empty `async` functions
async function noop() { }

// Async generators that use `yield*` with an async iterable
async function* delegateToAsyncIterable() {
  yield* otherAsyncIterable();
}

// `await using` awaits asynchronous resource disposal
async function consumeResource() {
  await using resource = acquire();
  consume(resource);
}
