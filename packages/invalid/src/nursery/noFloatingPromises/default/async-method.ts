class Api {
  async returnsPromise(): Promise<string> {
    return 'value';
  }
  async someMethod() {
    this.returnsPromise();
  }
}
