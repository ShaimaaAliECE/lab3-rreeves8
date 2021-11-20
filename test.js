let test = require('./testFormat.json');
let y = JSON.stringify(test)
let x = JSON.parse(y);

console.log(x[0].slot_1)

