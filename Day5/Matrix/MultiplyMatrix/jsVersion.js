const {performance} = require('perf_hooks');
const fs = require('fs');

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

function setUpMatrix(file){
  let mtrx1 = [];
  let mtrx2 = [];
  let k;
  let matrixData = file.matrixData;
  for(let i=0; i<file.row; i++){
    mtrx1.push([]);
    mtrx2.push([]);
    k = 2;
    for(let j=0; j<file.col; j++){
      mtrx1[i].push(file.matrixData[k]);
      mtrx2[i].push(file.matrixData[k]);
    }
  }
  return{
      row: file.row,
      col: file.col,
      mtrx1 : mtrx1,
      mtrx2 : mtrx2,
      mtrxResult : initiateMatrix(mtrx1, mtrx2)
    }
}
  


fs.readFile('input.txt', (err, data) => { 
  if (err) throw err; 
  let file = readFile(data);
  let matrixSetUp = setUpMatrix(file);
  let t0 = performance.now();
  multiplyMatrix(matrixSetUp.mtrx1, matrixSetUp.mtrx2, matrixSetUp.mtrxResult);
  let t1 = performance.now();
  console.log("Time taken to multiply these two matrices is " + (t1-t0) + " miliseconds");
  for(let i=0; i<matrixSetUp.row; i++){
    let txtRow = ""
    for(let j=0; j<matrixSetUp.col; j++){
      txtRow += matrixSetUp.mtrxResult[i][j] + " ";
    }
    console.log(txtRow);
  }

});




