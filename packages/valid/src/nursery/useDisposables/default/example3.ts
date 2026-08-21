function createDisposable(): Disposable {
  return {
    [Symbol.dispose]() {
      // do something
    },
  };
}

using disposable = createDisposable();
