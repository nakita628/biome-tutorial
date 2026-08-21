const Component = () => {
  const items = [];
  return <div>{!!items.length && <List items={items} />}</div>;
}
