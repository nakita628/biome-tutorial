import type { EffectCallback, DependencyList } from "react";
// custom useEffect function
declare function useEffect(cb: EffectCallback, deps?: DependencyList): void;

function component() {
  let name = "John Doe";
  useEffect(() => {
    console.log(name);
  }, []);
}
