function f(x) {
    if (x < 0) {
        throw new RangeError();
    } else {
        return x;
    }
}
