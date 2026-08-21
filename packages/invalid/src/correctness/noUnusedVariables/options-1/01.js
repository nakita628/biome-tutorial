const car = { brand: "Tesla", year: 2019, countryCode: "US" };
const { brand, ...other } = car;
console.log(other);
