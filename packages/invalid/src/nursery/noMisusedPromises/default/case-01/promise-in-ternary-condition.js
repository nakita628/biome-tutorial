const promise = Promise.resolve('value');
const val = promise ? 123 : 456; // Always evaluates to `123`.
