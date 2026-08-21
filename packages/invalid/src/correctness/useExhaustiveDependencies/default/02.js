import { useEffect } from "react";

function badComponent() {
  let a = 1;
  useEffect(() => {
    console.log(a);
  }, "not an array");
}
