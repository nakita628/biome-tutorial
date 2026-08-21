function countdown(n, step) {
    console.log(step);
    if (n === 0) return 0;
    return countdown(n - step, step);
}
