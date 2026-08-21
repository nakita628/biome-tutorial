// TypeScript-specific type-only `import` declaration:
// https://www.typescriptlang.org/docs/handbook/modules/reference.html#type-only-imports-and-exports

import { type export1, type export2 as alias2, type "string-name" as alias3, type default as defaultExport /* … */ } from "named-import";
import type { export1, export2 as alias2, "string-name" as alias3, default as defaultExport /* … */ } from "named-import";
import type defaultExport from "default-import";
