let add;

var importObject = { imports: { i: arg => console.log(arg) } };


function loadWasm(filename){
  return fetch(filename).then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes, importObject));
};

loadWasm("test.wasm")
.then(obj => {
  add = obj.instance.exports._Z3addii;
})

