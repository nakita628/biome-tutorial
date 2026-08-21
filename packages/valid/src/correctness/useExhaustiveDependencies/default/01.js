import { useEffect } from "react";

function component() {
  let a = 1;
  useEffect(() => {
    console.log(a);
  }, [a]);
}
