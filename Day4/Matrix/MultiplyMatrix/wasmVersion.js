const {performance} = require('perf_hooks');

let factory = require('./multiplyMatrix.js');

factory().then((instance) =>{
  let numOfRowMatrix1 = 3;
  let numOfColMatrix1 = 4;
  let numOfRowMatrix2 = 4;
  let numOfColMatrix2 = 3;
  const arr1 = new Uint8Array([1,1,1,1,1,1,1,1,1,1,1,1]);
  const buffer1 = instance._malloc(arr1.length);
  const arr2 = new Uint8Array([1,1,1,1,1,1,1,1,1,1,1,1]);
  const buffer2 = instance._malloc(arr2.length);
  let resultSize = numOfRowMatrix1*numOfColMatrix2;
  const bufferRes = instance._malloc(resultSize);

  instance.HEAPU8.set(arr1, buffer1);
  instance.HEAPU8.set(arr2, buffer2);

  let t0 = performance.now();
  instance.ccall('multiplyMatrix', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [buffer1, numOfRowMatrix1, numOfColMatrix1, buffer2, numOfRowMatrix2, numOfColMatrix2, bufferRes]);
  let t1 = performance.now();
  console.log("Time taken to multiply these two matrices is " + (t1-t0) + " miliseconds");

  let arrRes = instance.HEAPU8.subarray(bufferRes, bufferRes+resultSize);
  for(let i=0; i<numOfRowMatrix1; i++){
    let txtRow = ""
    for(let j=0; j<numOfColMatrix2; j++){
      txtRow += arrRes[i*numOfColMatrix2+j] + " ";
    }
    console.log(txtRow);
  }
  //console.log(instance.HEAPU8.subarray(bufferRes, bufferRes+resultSize));

  instance._free(buffer1);
  instance._free(buffer2);
  instance._free(bufferRes);
})
