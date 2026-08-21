class Counter {
    count(n, acc) {
        if (n === 0) return 0;
        return this?.count(n - 1, acc);
    }
}
