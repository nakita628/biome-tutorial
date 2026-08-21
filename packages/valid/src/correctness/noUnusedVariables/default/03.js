const car = { brand: "Tesla", year: 2019, countryCode: "US" };
const { brand, ...rest } = car;
console.log(rest);
