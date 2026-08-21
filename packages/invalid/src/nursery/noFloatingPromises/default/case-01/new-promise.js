const promise = new Promise((resolve) => resolve('value'));
promise.then(() => { }).finally(() => { });
