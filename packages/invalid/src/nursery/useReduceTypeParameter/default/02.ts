const arr: string[] = ['a', 'b'];
arr.reduce((acc, name) => ({ ...acc, [name]: true }), {} as Record<string, boolean>);
