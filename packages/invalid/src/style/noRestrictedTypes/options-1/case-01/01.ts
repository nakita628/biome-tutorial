interface Foo {
  value: number
}

export function handle(input: Foo): void {
  console.log(input.value)
}
