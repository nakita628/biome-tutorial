import "vite"; // package is correctly declared

import assert from "node:assert"; // Node imports don't need declaration

import { A } from "./local.js"; // relative imports don't trigger the rule
import { B } from "#alias"; // same goes for aliases
