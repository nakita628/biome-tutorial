const Component = () => {
  const user = null;
  return <div>{user ? <Profile user={user} /> : null}</div>;
}
