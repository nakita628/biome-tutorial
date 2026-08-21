for (var i = 0; i < 10; i++) {
    const current = i;
    queue.push(function() {
        return current;
    });
}
