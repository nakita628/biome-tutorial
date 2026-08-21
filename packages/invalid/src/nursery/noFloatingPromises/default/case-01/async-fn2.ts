const returnsPromise = async (): Promise<string> => {
  return 'value';
}
async function returnsPromiseInAsyncFunction() {
  returnsPromise().then(() => {});
}
