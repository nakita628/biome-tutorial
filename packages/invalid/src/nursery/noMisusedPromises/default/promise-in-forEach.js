// These `fetch`-es are not `await`-ed in order:
[1, 2, 3].forEach(async value => {
    await fetch(`/${value}`);
});
