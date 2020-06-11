'use strict'

const {ccallArrays, cwrapArrays} = require("wasm-arrays");

global.Module = require("./demo.js");

const res = ccallArrays("doubleValues", "array", ["array"], [[1,2,3,4,5]], {heapIn: "HEAP8", heapOut: "HEAP8", returnArraySize: 5})
console.log(res) // [2,4,6,8,10]

//console.log(ccallArrays);

// const fs = require('fs');

// const bytes = fs.readFileSync('./test.wasm');

// (async () => {
//   const module = await WebAssembly.compile(bytes);
//   const instance = await WebAssembly.instantiate(module);
//   let doubleValue = instance.exports._Z12doubleValuesPai;
//   console.log(doubleValue);
//   //const res = ccallArrays(doubleValue, "array", ["array"], [[1,2,3,4,5]], {heapIn: "HEAP8", heapOut: "HEAP8", returnArraySize: 5})
//   //console.log(res) // [2,4,6,8,10]
// })();

