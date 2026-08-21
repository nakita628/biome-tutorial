function fn(n, acc) {
    if (n === 0) return 0;
    return fn(n - 1, acc || 0);
}
