// Dynamic `import()` calls:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import

import('sideeffect-import');
await import('sideeffect-import');

// ...using await + destructuring-assignment:
const alias1 = await import('namespace-import');
const { default: defaultExport } = await import('default-import')
const { export1, export2: alias2, "string-name": alias3, default: defaultExport /* … */ } = await import("named-import");

// ...using then() with arrow-function + destructuring parameters:
import('namespace-import').then(alias1 => { /* … */ });
import('namespace-import').then((alias1) => { /* … */ });
import('default-import').then(({ default: defaultExport }) => { /* … */ });
import('named-import').then(({ export1, export2: alias2, "string-name": alias3, default: defaultExport /* … */ }) => { /* … */ });

// ...using then() with function + destructuring parameters:
import('namespace-import').then(function(alias1) { /* … */ });
import('default-import').then(function({ default: defaultExport }) { /* … */ });
import('named-import').then(function({ export1, export2: alias2, "string-name": alias3, default: defaultExport /* … */ }) { /* … */ });

// Standalone `import('...')` calls that appear in some other
// unrecognized context will be treated as a namespace import,
// because the return value of `import('...')` is a namespace object:

myFunction(...args, import("namespace-import"), ...args)
