it("should allow passing 'foo' as an argument", () => {
  expectTypeOf(myFunc).toBeCallableWith("foo");
});
