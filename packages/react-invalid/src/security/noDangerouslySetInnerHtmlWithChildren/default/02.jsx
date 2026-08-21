function createMarkup() {
    return { __html: 'child' }
}
<Component dangerouslySetInnerHTML={createMarkup()} children="child1" />
