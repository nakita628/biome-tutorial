const foo = () => 0;
const bar = () => { "use strict"; return 1 }
const baz = () => { /* intentional */ return x }
const qux = () => ({ a: 1 })   // already concise with parens
