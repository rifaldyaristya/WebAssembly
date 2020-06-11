const {performance} = require('perf_hooks');

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

function multiplyMatrix(matrix1, matrix2, mtrxResult){
  for(var i=0; i<matrix1.length; i++){
    for(var j=0; j<matrix2[0].length; j++){
      for(var k=0; k<matrix2.length; k++){
        mtrxResult[i][j] += matrix1[i][k]*matrix2[k][j];
      }
    }
  }

  return 0;
}

let mtrx1 = [[1,1,1,1],[1,1,1,1],[1,1,1,1]];
let mtrx2 = [[1,1,1],[1,1,1],[1,1,1],[1,1,1]];
let mtrxResult = initiateMatrix(mtrx1, mtrx2);
let row = mtrxResult.length;
let column = mtrxResult[0].length;


let t0 = performance.now();
multiplyMatrix(mtrx1, mtrx2, mtrxResult);
let t1 = performance.now();
console.log("Time taken to multiply these two matrices is " + (t1-t0) + " miliseconds");

for(let i=0; i<row; i++){
  let txtRow = ""
  for(let j=0; j<column; j++){
    txtRow += mtrxResult[i][j] + " ";
  }
  console.log(txtRow);
}





