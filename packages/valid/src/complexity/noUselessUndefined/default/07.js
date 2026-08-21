let foo;
const {foo} = bar;
function foo() {
  return;
}
function* foo() {
  yield;
}
function foo(bar) {}
function foo({bar}) {}
foo();
