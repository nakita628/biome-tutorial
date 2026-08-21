class A {
    method() {
        const self = this;
        return function() {
            this.g();
            return self;
        }
    }
}
