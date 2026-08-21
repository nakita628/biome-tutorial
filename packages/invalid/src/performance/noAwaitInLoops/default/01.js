async function invalid() {
    for (const thing of things) {
        const result = await asyncWork();
    }
}
