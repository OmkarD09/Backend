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

// let info = require('./Fruits');
// const { sub } = require('./math');
// console.log(info);

// let figlet = require('figlet');
// figlet("Hello World!!", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });

// let figlet = require('figlet');

import {add, sub, mul, div} from './math.js';

console.log(add(10, 5));
console.log(sub(10, 5));  
console.log(mul(10, 5));
console.log(div(10, 5));

import { generateSlug } from "random-word-slugs";
console.log(generateSlug());