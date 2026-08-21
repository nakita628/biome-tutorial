function fn(n, threshold) {
    if (n > threshold) return n;
    return fn(n + 1, threshold);
}
