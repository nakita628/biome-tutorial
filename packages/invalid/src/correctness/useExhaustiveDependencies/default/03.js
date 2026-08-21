import { useEffect } from "react";

function component() {
    let unused = 1;
    useEffect(() => {}, [unused]);
}
