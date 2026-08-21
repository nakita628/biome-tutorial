function Foo() {
  let stateVar = 1;
  useQuery([stateVar], "smthng", () => {console.log(stateVar)});
}
