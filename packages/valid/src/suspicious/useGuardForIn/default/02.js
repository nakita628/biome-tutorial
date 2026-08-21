for (key in foo) {
  if (Object.hasOwn(foo, key)) {
   doSomething(key);
  }
}
