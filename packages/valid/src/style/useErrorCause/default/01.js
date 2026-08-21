try {
  // ...
} catch (err) {
  throw new Error("Something went wrong", { cause: err });
}

try {
    throw "Not a rethrow, so it's ignored when nested";
} catch (err) {
    const fn = () => {
        throw new Error("New unrelated error");
    }
    fn();
}
