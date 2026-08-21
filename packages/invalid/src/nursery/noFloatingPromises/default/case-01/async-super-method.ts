class Parent {
  async returnsPromise(): Promise<string> {
    return 'value';
  }
}

class Child extends Parent {
  async someMethod() {
    this.returnsPromise();
  }
}
