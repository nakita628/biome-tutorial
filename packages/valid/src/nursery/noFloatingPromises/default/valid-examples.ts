async function returnsPromise(): Promise<string> {
  return 'value';
}

await returnsPromise();

void returnsPromise();

// Calling .then() with two arguments
returnsPromise().then(
  () => {},
  () => {},
);

// Calling .catch() with one argument
returnsPromise().catch(() => {});

await Promise.all([p1, p2, p3])

class Api {
  async returnsPromise(): Promise<string> {
    return 'value';
  }
  async someMethod() {
    await this.returnsPromise();
  }
}

type Props = {
  returnsPromise: () => Promise<void>;
};

async function testCallingReturnsPromise(props: Props) {
  return props.returnsPromise();
}
