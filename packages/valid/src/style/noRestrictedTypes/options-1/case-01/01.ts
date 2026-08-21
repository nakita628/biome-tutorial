interface Bar {
  value: number
}

export function handle(input: Bar): void {
  console.log(input.value)
}
