var a = ['a', 'b', 'c'];
a.reduce((acc, val) => {return Object.assign(acc, val);}, []);
