import { useEffect } from "react";

function component() {
  const SECONDS_PER_DAY = 60 * 60 * 24;
  useEffect(() => {
    console.log(SECONDS_PER_DAY);
  });
}
