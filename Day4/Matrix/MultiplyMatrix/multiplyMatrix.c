#include <stdio.h>
#include <emscripten.h>
#include <stdint.h>

int multiplyMatrix(int8_t* mtrx1, int row1, int col1, int8_t* mtrx2, int row2, int col2, int8_t* mtrxRes){
  for(int i=0; i<row1; i++){
    for(int j=0; j<col2; j++){
      for(int k=0; k<row2; k++){
        mtrxRes[i*col2 + j] += mtrx1[i*col1 + k] * mtrx2[k*col2 + j];
      }
    }
  }
  return 0;
}