function head<T>(items: T[] | null) {
    if (items) {
        return items[0];
    }
}

function bar(arg: string | undefined) {
    return arg?.length;
}

function f(v: 'a' | 'b' | 'c') {
    switch (v) {
        case 'a': break;
        case 'b': break;
        case 'c': break;
    }
}

let greeting = false;
function update() { greeting = "Hello"; }
if (greeting) {}
