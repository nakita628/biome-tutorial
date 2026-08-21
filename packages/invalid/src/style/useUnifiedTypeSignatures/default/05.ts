export function fizzbuzz([fizz, buzz]: [number, number]): void;
export function fizzbuzz([fizz, buzz]: [string, string]): void;
export default function fizzbuzz([fizz, buzz]: [string | number, string | number]): void {}
