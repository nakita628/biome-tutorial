class MyClass implements AsyncDisposable {
  async [Symbol.asyncDispose]() {
    // do something
  }
}

const instance = new MyClass();
