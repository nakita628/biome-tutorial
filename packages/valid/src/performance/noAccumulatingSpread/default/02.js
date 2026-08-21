var a = ['a', 'b', 'c'];
a.reduce((acc, val) => Object.assign(acc, val), []);
