const arr: number[] = [1, 2, 3];
arr.reduceRight((sum, num) => sum.concat(num * 2), [] as number[]);
