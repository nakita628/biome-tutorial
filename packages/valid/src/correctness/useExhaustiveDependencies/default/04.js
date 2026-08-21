import { useEffect } from "react";

function component() {
  let a = 1;
  // biome-ignore lint/correctness/useExhaustiveDependencies(a): suppress dependency a
  useEffect(() => {
    console.log(a);
  }, []);
}
