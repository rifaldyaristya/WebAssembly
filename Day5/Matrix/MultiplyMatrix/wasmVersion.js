const {performance} = require('perf_hooks');
const fs = require('fs');

let factory = require('./multiplyMatrix.js');

function readFile(data){
  let text = data.toString();
  let textToArray = text.split("|");
  let sizeData = textToArray[0].split(" ");
  return {
    row: sizeData[0],
    col : sizeData[1],
    matrixData : textToArray[1].split("").filter(item => (item !== " " && item !== "\r" && item !== "\n"))
  }
}

function setUpMatrix(file, instance){
  let row = file.row;
  let col = file.col;
  let numOfRowMatrix1 = row;
  let numOfColMatrix1 = col;
  let numOfRowMatrix2 = row;
  let numOfColMatrix2 = col;
  const arr1 = new Uint8Array(file.matrixData);
  const buffer1 = instance._malloc(arr1.length);
  const arr2 = new Uint8Array(file.matrixData);
  const buffer2 = instance._malloc(arr2.length);
  let resultSize = numOfRowMatrix1*numOfColMatrix2;
  const bufferRes = instance._malloc(resultSize);
  instance.HEAPU8.set(arr1, buffer1);
  instance.HEAPU8.set(arr2, buffer2);

  return{
    arr1 : arr1,
    arr2 : arr2,
    numOfRowMatrix1 : numOfRowMatrix1,
    numOfColMatrix1 : numOfColMatrix1,
    numOfRowMatrix2 : numOfRowMatrix2,
    numOfColMatrix2 : numOfColMatrix2,
    buffer1 : buffer1,
    buffer2 : buffer2,
    bufferRes : bufferRes,
    resultSize : resultSize
  }
}

factory().then((instance) =>{
  fs.readFile('input/input800x800.txt', (err, data) => { 
    if (err) throw err; 
    let file = readFile(data);
    let matrixSetUp = setUpMatrix(file, instance);
    //console.log(matrixSetUp.arr1);
    //console.log(matrixSetUp.arr2);
    let t0 = performance.now();
    instance.ccall('multiplyMatrix', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [matrixSetUp.buffer1, matrixSetUp.numOfRowMatrix1, matrixSetUp.numOfColMatrix1, matrixSetUp.buffer2, matrixSetUp.numOfRowMatrix2, matrixSetUp.numOfColMatrix2, matrixSetUp.bufferRes]);
    let t1 = performance.now();
    console.log("Time taken to multiply these two matrices is " + (t1-t0) + " miliseconds");
    let arrRes;
    arrRes = instance.HEAPU8.subarray(matrixSetUp.bufferRes, matrixSetUp.bufferRes+matrixSetUp.resultSize);
    //console.log(arrRes);
    // for(let i=0; i<matrixSetUp.numOfRowMatrix1; i++){
    //   let txtRow = ""
    //   for(let j=0; j<matrixSetUp.numOfColMatrix2; j++){
    //     txtRow += arrRes[i*matrixSetUp.numOfColMatrix2+j] + " ";
    //   }
    //   console.log(txtRow);
    // }

    instance._free(matrixSetUp.buffer1);
    instance._free(matrixSetUp.buffer2);
    instance._free(matrixSetUp.bufferRes);
  });
});