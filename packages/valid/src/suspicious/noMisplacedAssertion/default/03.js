test.each([1, 2, 3])('test', (a, b, expected) => {
    expect(a + b).toBe(expected)
})
