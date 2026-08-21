try {
    doSomething();
} catch(e) {
    doSomethingWhenCatch();
    throw e;
}
