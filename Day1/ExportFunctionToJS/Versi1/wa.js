'use strict';


const fs = require('fs');
const bytes = fs.readFileSync('./test.wasm');

(async () => {
  // Explicitly compile and then instantiate the wasm module.
  const module = await WebAssembly.compile(bytes);
  const instance = await WebAssembly.instantiate(module);
  let add = instance.exports._Z3addii;
  console.log(add(8, 5));
})();


