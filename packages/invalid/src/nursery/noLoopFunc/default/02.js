let value = 0;
for (let i = 0; i < 10; i++) {
    queue.push(function () {
        return value;
    });
    value += 1;
}
