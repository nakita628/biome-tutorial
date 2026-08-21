// No "use client" directive - server component can be async
export default async function ServerComponent() {
  const data = await fetch('/api/data');
  return <div>{data}</div>;
}
