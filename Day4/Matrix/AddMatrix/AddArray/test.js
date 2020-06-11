var factory = require('./addArray.js');

factory().then((instance) =>{
  let row = 2;
  let col = 2;
  const arr1 = new Uint8Array([1,2,3,4]);
  const buffer1 = instance._malloc(arr1.length);
  const arr2 = new Uint8Array([5,6,7,8]);
  const buffer2 = instance._malloc(arr2.length);
  const bufferRes = instance._malloc(arr1.length);

  instance.HEAPU8.set(arr1, buffer1);
  instance.HEAPU8.set(arr2, buffer2);

  //console.log(instance.HEAPU8.subarray(buffer, buffer+myArray.length));

  instance.ccall('addArray', 'number', ['number', 'number', 'number', 'number'], [buffer1, buffer2, bufferRes, row*col]);

  console.log(instance.HEAPU8.subarray(bufferRes, bufferRes+arr1.length));

  instance._free(buffer1);
  instance._free(buffer2);
  instance._free(bufferRes);
})
