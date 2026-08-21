abstract class Base {
    abstract method(): void;
}

class Derived extends Base {
    override method() {} // ignored because it has `override`
}
