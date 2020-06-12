const fs = require('fs') 

let arr2;
fs.readFile('Input.txt', (err, data) => { 
	if (err) throw err; 
  
  let text = data.toString();
  let arr1 = text.split("");
  //console.log(arr1);
  arr2 = arr1.filter(item => item !== " ").filter(item => item !== "\r").filter(item => item !== "\n");
  console.log(arr2 + "lala");
}) 

console.log(arr2);


