// multiple call signatures (overloads) is allowed:
interface Overloaded {
  (data: string): number;
  (id: number): string;
}
// this is equivalent to Overloaded interface.
type Intersection = ((data: string) => number) & ((id: number) => string);
