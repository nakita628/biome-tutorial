;[1, 2, 3].map((it) => {
    if (it % 2 === 0) {
        return it;
    }
    if (it > 2) {
        return it ** 2;
    }
    return;
}).filter(Boolean);
