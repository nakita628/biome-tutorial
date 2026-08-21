// JSON.stringify() with a replacer function
new Response(JSON.stringify({ value: 0 }, () => {}))
