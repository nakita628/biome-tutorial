import { useEffect } from "react";

function component() {
  let a = 1;
  let b = 1;
  // biome-ignore lint/correctness/useExhaustiveDependencies(a): suppress dependency a
  // biome-ignore lint/correctness/useExhaustiveDependencies(b): suppress dependency b
  useEffect(() => {
    console.log(a, b);
  }, []);
}
