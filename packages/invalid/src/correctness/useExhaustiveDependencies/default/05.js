import { useEffect, useState } from "react";

function component() {
  const name = "foo"
  // name doesn't change, so specifying it is redundant
  useEffect(() => {
    console.log(name);
  }, [name]);
}
