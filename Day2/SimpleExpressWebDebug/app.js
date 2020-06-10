const {performance} = require('perf_hooks');

var express = require("express");
var app = express();

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


function initiateMatrix(matrix1, matrix2){
  var result=[];
  for(var i=0; i<matrix1.length; i++){
    result.push([]);
    for(var j=0; j<matrix2[0].length; j++){
      result[i][j] = 0;
    }
  }
  return result;
}

function multiplyMatrix(matrix1, matrix2){
  var result = initiateMatrix(matrix1, matrix2);
  for(var i=0; i<matrix1.length; i++){
    for(var j=0; j<matrix2[0].length; j++){
      for(var k=0; k<matrix2.length; k++){
        result[i][j] += matrix1[i][k]*matrix2[k][j];
      }
    }
  }
  return result;
}

var t0 = performance.now();
console.log(multiplyMatrix([[1,1,1],[1,1,1]],[[1,1],[1,1],[1,1]]));
var t1 = performance.now();
console.log("Time taken to multiply these two matrices is " + (t1-t0) + " miliseconds");

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
  res.render("index",{add:add});
});

app.get("/arithmatic", (req,res)=>{
  res.render("arithmatic");
});

app.listen(5000, ()=>{
  console.log("Server ready!");
});

