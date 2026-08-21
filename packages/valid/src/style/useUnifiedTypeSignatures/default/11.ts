function f<T extends number>(x: T): void;
function f<T extends string>(x: T): void;
function f(x: unknown): void {}
