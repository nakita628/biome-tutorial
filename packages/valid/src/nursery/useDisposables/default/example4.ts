class MyClass implements AsyncDisposable {
  async [Symbol.asyncDispose]() {
    // do something
  }
}

await using instance = new MyClass();
