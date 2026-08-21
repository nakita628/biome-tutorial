function ParentComponent() {
  const MemoizedChild = memo(() => {
    return <div>Hello</div>;
  });

  return <MemoizedChild />;
}
