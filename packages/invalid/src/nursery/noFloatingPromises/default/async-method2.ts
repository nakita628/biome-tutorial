class Api {
  async returnsPromise(): Promise<string> {
    return 'value';
  }
}
const api = new Api();
api.returnsPromise().then(() => {}).finally(() => {});
