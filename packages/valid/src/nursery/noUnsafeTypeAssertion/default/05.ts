function assertIsString(value: unknown): asserts value is string {
    if (!isString(value)) {
        throw new TypeError("Expected a string");
    }
}
