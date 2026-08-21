LOOP: for (const x of xs) {
    if (x > 0) {
        break LOOP;
    }
    f(x);
}
