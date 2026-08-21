interface SomeType {
    value: string;
}
declare const asserted;
(asserted as SomeType).value = "foo";
