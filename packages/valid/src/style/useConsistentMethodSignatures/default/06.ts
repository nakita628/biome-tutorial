type Thing<T> = {
  genericProp: <U>(arg: U) => T;
}
