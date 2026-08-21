// Nested but references outer scope variable 'a'
doThing()
  .then(a => getB(a)
    .then(b => getC(a, b))
  )
