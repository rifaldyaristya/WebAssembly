var add;

var importObject = { imports: { i: arg => console.log(arg) } };


function loadWasm(filename){
  return fetch(filename).then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes, importObject));
};

loadWasm("test.wasm")
.then(obj => {
  add = obj.instance.exports._Z3addii;
  console.log(add(1,2));
})
console.log(add(1,2));


