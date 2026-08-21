function Foo() {
  let stateVar = 1;
  useLocation(() => {console.log(stateVar)}, []);
}
