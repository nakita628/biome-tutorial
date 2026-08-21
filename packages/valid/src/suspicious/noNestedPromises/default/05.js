// Chained promises (no nesting)
doThing()
  .then(a => getB(a))
  .then(b => getC(b))
