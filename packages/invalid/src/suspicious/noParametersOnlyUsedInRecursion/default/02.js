function countdown(n, step) {
    if (n === 0) return 0;
    return countdown(n - step, step);
}
