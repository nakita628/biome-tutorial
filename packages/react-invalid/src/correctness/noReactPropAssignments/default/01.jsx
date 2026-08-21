function Foo(props) {
	props.bar = "Hello " + props.bar;

	return <div>{props.bar}</div>
}
