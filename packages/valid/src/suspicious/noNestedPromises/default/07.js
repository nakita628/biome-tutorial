// Promise.resolve/all are fine
doThing().then(function() { return Promise.all([a,b,c]) })
doThing().then(() => Promise.resolve(4))
