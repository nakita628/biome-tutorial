declare let value: number | undefined;
console.log(value);

declare module "my-module" {
    let value: string;
    export = value;
}
