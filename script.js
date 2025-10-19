// let n = 5;
// for (let i = 1; i <= n; i++) {
//     console.log("hello",i);
// }

let args = process.argv;
for (let i = 2; i < args.length; i++) {
    console.log("hello", args[i]);
}

// const math = require('./math');
// console.log(math.add(2, 3));
// console.log(math.sub(2, 3));
// console.log(Math.floor(math.mul(2, 3)));
// console.log(Math.floor(math.div(2, 3)));

//

let info = require('./fruits');
console.log(info);
