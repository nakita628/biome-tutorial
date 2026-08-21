type wrapFn<T extends (...args: never) => unknown> = { func: T }
