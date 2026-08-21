function html() {
    return { __html: "foo" }
}
<a dangerouslySetInnerHTML={html()} />
