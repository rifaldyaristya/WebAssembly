#include <stdio.h>
#include <emscripten.h>
#include <stdint.h>

int addArray(int8_t * buf1, int8_t * buf2, int8_t * bufRes, int bufSize){
  for(int i=0; i<bufSize; i++){
    bufRes[i] = buf1[i] + buf2[i];
  }
  
  return 0;
}