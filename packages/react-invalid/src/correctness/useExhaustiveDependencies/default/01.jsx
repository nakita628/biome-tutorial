import { useCallback } from "react";

function component() {
  const Component = () => null;
  const render = useCallback(() => <Component />, []);
}
