function createDisposable(): Disposable {
  return {
    [Symbol.dispose]() {
      // do something
    },
  };
}

const disposable = createDisposable();
