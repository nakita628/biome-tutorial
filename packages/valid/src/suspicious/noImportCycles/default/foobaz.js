export function foo() {
    console.log("foobaz");
}

export * as baz from './foobaz.js';

import { baz } from './foobaz.js';
