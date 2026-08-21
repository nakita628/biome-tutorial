// Private exports are accessible within the same module only, but
// modules can be nested. So the following works because you can always
// import from the index file of a parent module:
import { subPrivateVariable } from "../index.js";
