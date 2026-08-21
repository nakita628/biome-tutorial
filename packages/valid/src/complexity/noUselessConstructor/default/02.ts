class D {
  constructor(public arg: number){}
}

class F extends D {
  // constructor with default parameters are allowed.
  constructor(arg = 4) {
    super(arg)
  }
}
