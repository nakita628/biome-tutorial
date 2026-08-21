interface Config { items: string[] }
function f(c: Config) {
    return c.items || [];
}
