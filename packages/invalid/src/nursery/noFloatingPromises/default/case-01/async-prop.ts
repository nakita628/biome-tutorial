type Props = {
  returnsPromise: () => Promise<void>;
};

async function testCallingReturnsPromise(props: Props) {
  props.returnsPromise();
}
