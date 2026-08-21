function factorial(n, acc) {
    if (n === 0) return 1;
    return factorial(n - 1, acc);
}
