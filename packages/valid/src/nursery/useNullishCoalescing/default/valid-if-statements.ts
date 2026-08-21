declare let a: { x: string } | null;
declare function makeA(): { x: string };
if (!a) {
    a = makeA();
}
