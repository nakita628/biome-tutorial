// Static `import` declaration:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

import "sideeffect-import";
import * as alias1 from "namespace-import";
import { export1, export2 as alias2, "string-name" as alias3, default as defaultExport /* … */ } from "named-import";
import defaultExport from "default-import";
import defaultExport, * as alias5 from "default+namespace-import";
import defaultExport, { export1 /* … */ } from "default+named-import";

export * from "namespace-import";
export { export1, export2 as alias2, "string-name" as alias3, default as defaultExport /* … */ } from "named-import";
