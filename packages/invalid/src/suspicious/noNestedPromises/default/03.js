doThing()
  .then(a => getB(a)
    .then(b => getC(b))
  )
