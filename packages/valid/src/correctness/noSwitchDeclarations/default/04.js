switch (foo) {
    case 0: {
        const x = 1;
        break;
    }
    case 1:
        // `x` is not visible here
        break;
}
