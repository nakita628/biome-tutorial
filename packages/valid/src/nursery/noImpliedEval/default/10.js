// setTimeout is shadowed by a local variable
function foo(setTimeout) {
    setTimeout("alert('Hello world!');", 100);
}
