const obj = {
  async returnsPromise(): Promise<string> {
    return 'value';
  },
};

obj.returnsPromise();
