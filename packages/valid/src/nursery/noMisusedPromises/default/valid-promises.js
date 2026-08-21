const promise = Promise.resolve('value');
if (await promise) { /* Do something */ }

const val = (await promise) ? 123 : 456;

while (await promise) { /* Do something */ }

const getData = () => fetch('/');
console.log({ foo: 42, ...(await getData()) });

// for-of puts `await` in outer context:
for (const value of [1, 2, 3]) {
    await doSomething(value);
}
