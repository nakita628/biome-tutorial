React.Children.map(this.props.children, (child, index) => (
    React.cloneElement(child, { key: index })
))
