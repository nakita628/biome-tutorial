function fn(): string {
    return "Not inline";
}
const direct = fn() as string;
const nested = { result: fn() as string };
