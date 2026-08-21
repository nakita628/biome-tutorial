import { useEffect, useState } from "react";

function component() {
  const [name, setName] = useState();
  useEffect(() => {
    console.log(name);
    setName("");
  }, [name]);
}
