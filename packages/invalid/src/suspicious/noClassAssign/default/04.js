let A = class A {
	b() {
		A = 0;
		// `let A` is shadowed by the class name.
	}
}
