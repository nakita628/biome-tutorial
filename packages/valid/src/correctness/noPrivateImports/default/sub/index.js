// Package-private exports can be imported from inside the same module.
import { fooPackageVariable } from "./foo.js";

// Resources (anything other than JS/TS files) are always exempt.
import { barResource } from "../resources/bar.png";

/** @private */
export const subPrivateVariable = 2;
