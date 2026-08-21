function withAuth(WrappedComponent) {
  function AuthenticatedComponent(props) {
    return <WrappedComponent {...props} />;
  }
  return AuthenticatedComponent;
}
