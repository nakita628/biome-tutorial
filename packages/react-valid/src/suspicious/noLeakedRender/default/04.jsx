const Component = () => {
  const condition = false;
  return <div>{condition ? <Content /> : <Fallback />}</div>;
}
