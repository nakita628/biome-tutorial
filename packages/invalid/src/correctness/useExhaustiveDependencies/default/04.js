import { useEffect, useState } from "react";

function component() {
  const [name, setName] = useState();
  useEffect(() => {
    console.log(name);
    setName("i never change and don't need to be here");
  }, [name, setName]);
}
