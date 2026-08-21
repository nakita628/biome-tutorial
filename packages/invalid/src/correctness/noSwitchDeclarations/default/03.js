switch (foo) {
    case 0:
        class A {}
        break;
    default:
        new A(); // `A` can be instantiated here
        break;
}
