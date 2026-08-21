class A {
    protected constructor() {
        this.prop = 1;
    }
}

class B extends A {
    // Make the parent constructor public.
    constructor () {
        super();
    }
}
