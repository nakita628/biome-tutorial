async function valid() {
    await Promise.all(things.map((thing) => asyncWork(thing)))
}
