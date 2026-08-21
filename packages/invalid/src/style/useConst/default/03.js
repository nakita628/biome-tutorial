// `a` is redefined (not reassigned) on each loop step.
for (let a in [1, 2, 3]) {
    console.log(a);
}
