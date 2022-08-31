function lShift(num, nShifts=1, bits=8){
	maxbit = 1 << (bits-1); // is like: Math.pow(2, bits -1);
	bits = (maxbit << 1)-1; // is like: Math.pow(2, bits) -1;
	for(let i = 0; i < nShifts; i++){
		num = num << 1;
		
		if( num > bits){
			num = num % maxbit;
			num++;
		}
	}
	return num;
}

function rShift(num, nShifts=1, bits=8){
	maxbit = 1 << bits;  // Math.pow(2, bits)
	for(let i = 0; i < nShifts; i++){
		if(num%2){
			num = num + maxbit;
		}
		num = num >> 1;
	}
	return num;
}

function __recurbitSplit(num, splitPos, n){
	unshifted = num[num.length - 1]
	tmp = unshifted % n;
	num.unshift(tmp);
	num[num.length - 1] = unshifted >> splitPos;
	if(num[num.length - 1] <= 0){
		num.pop();
		return num;
	}
	return __recurbitSplit(num, splitPos, n);
}

function recurSplit(num, splitPos) {
	input = [num];
	n = 1 << splitPos;
	return __recurbitSplit(input, splitPos, n);
}

function bitSplit(num, splitAtBit){
	let result = [];
	var n = 1 << splitAtBit;
	do{
		tmp = num % n;
		num = num >> splitAtBit;
		result.unshift(tmp);
	}while(num>0);
	return result;
}

function recurAddZeros(numArray, len=4){
	if(numArray.length%4 !== 0){
		numArray.unshift(0);
		return recurAddZeros(numArray, len);
	}
	return numArray;
}

function splitFlatten(numArray, base=4){
	let tLen = myText.length;
	for( var i = 0; i < tLen; i++){
		numArray[i] = recurSplit(numArray[i], base);
	}
	numArray = numArray.flat();
	return numArray
}

//tst
console.log( rShift(3) );		// input 0000.0011 -> 1000.0001  || 3 -> 129
console.log( rShift(3,1, 4) );		// input 0011 -> 1001
console.log( lShift(128,1, 8) );	// input 1000.0000 -> 0000.0001  || 128 -> 1
console.log( bitSplit(128,4) );		// input 1000.0000 ->[1000,0000] || 128 -> [8,0]
console.log( bitSplit(1023,2) );	// input 11.1111.1111 -> [11,11,11,11,11,11] || 128 -> [3,3,3,3,3]
console.log( recurSplit(1023,2) );	// same as before, just recursively
console.log( bitSplit(141,4) );		// input 1000.1101 -> [1000,1101] || 141 -> [8,13]
console.log( recurSplit(141,4) );	// same as before, just recursively

//encryption:

let myText = [102,111,111]; //01100110, 01101111, 01101111 -> f,o,o
myText = splitFlatten(myText, 4);
myText = recurAddZeros(myText);
console.log( "My Text Result: " + myText );	// Result: My Text Result: 0,0,6,6,6,15,6,15
