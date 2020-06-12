'use strict';

const {performance} = require('perf_hooks');

const fs = require('fs');
const bytes = fs.readFileSync('./test.wasm');

(async() => {
  const module = await WebAssembly.compile(bytes);
  const instance = await WebAssembly.instantiate(module,{});
  let fiboWASM = instance.exports._Z9fibonaccii;
  let startTimeWASM = performance.now();
  let result = await fiboWASM(20);
  console.log(result);
  let finishTimeWASM = performance.now();
  console.log("Time taken to calculate fibonacci with function from WASM of 10 is " + (finishTimeWASM-startTimeWASM) + " miliseconds");
})();


function fiboJS(n){
  if(n===0){
    return 0;
  }
  else if(n===1){
    return 1;
  }
  else{
    return fiboJS(n-1)+fiboJS(n-2);
  }
}

let startTime = performance.now();
let result = fiboJS(20);
console.log(result);
let finishTime = performance.now();
console.log("Time taken to calculate fibonacci with function directly from JS of 10 is " + (finishTime-startTime) + " miliseconds");