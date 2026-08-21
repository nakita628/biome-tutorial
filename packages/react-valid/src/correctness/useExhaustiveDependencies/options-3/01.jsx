import { useEffect } from "react";

function Foo() {
  let stateVar = 1;
  // not used but still OK
  useEffect(() => {}, [stateVar]);
}
