'use strict';

const fs = require('fs');
const bytes = fs.readFileSync('./test.wasm');

(async () =>{
  const module = await WebAssembly.compile(bytes);
  const instance = await WebAssembly.instantiate(module);
  let add = instance.exports._Z3minii;
  console.log(add(2,3));
})();

