const arr: number[] = [1, 2, 3];
arr.reduce<number[]>((sum, num) => sum.concat(num * 2), []);

arr.reduce((a, b) => a + b);

arr.reduce((sum, n) => sum + n, 0);
