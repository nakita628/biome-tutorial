function makeComponent(label) {
  function MyComponent() {
    return <div>{label}</div>;
  }
  return MyComponent;
}
