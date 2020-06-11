(async () => {
  global.Module = await import("./module.js");
  const test = await import("./test.wasm");

  const myArray = new Uint8Array([1, 2, 3, 4, 5]);
  const buffer = Module.default._malloc(myArray.length);
  Module.default.HEAPU8.set(myArray, buffer);

  Module.default.ccall('doubleValues', 'number', ['number', 'number'], [buffer, myArray.length]);

  console.log(Module.default.HEAPU8.subarray(buffer, buffer+myArray.length));

  Module.default._free(buffer);
})();