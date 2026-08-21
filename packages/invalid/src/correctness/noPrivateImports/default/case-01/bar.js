// Attempt to import package private variable from `sub/foo.js` from
// outside its `sub` module:
import { fooPackageVariable } from "./sub/foo.js";

/**
 * @private For test purposes only!
 */
export function getTestStuff() {}
