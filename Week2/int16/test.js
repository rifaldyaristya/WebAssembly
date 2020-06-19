let factory = require('./hello.js');

factory().then((instance) =>{
  var input_array = new Int32Array([10, 5, -3, 300, -70]); // array of 32-bit signed int to pass
	var len = input_array.length;					         // 5 elements
	var bytes_per_element = input_array.BYTES_PER_ELEMENT;   // 4 bytes each element
    
	// alloc memory, in this case 5*4 bytes
	var input_ptr = instance._malloc(len * bytes_per_element);
	var output_ptr = instance._malloc(len * bytes_per_element);
    
	instance.HEAP32.set(input_array, input_ptr / bytes_per_element); // write WASM memory calling the set method of the Int32Array, (see below for details)
  instance.ccall('addOne', 'number', ['number', 'number', 'number'], [input_ptr, output_ptr, len]);
  // addOne(input_ptr, output_ptr, len);   	                       // call the WASM function
	var output_array = new Int32Array(instance.HEAP32.buffer, output_ptr, len); // extract data to another JS array
	console.log("The starting array was:", input_array);
	console.log("The result read is:	", output_array);
    
	// dealloc memory
	instance._free(input_ptr);
	instance._free(output_ptr);
})

