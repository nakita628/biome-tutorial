try {
    doSomething();
} catch (error) {
    if (whatever) {
        const error = anotherError; // This declaration shadows the caught error.
        throw new Error("Something went wrong", { cause: error });
    }
}
