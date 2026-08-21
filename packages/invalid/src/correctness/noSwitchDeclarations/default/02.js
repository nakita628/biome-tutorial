switch (foo) {
    case 0:
        function f() {}
        break;
    case 2:
        f(); // `f` can be called here
        break;
}
