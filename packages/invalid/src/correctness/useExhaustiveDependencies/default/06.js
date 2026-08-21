import { useEffect } from "react";

function component() {
  let a = 1;
  const b = a + 1;
  useEffect(() => {
    console.log(b);
  }, []);
}
