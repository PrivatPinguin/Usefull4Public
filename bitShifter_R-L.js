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

//tst
console.log( rShift(3) );		// input 0000.0011 -> 1000.0001  || 3 -> 129
console.log( rShift(3,1, 4) );		// input 0011 -> 1001 || 3 -> 9
console.log( lShift(128,1, 8) );	// input 1000.0000 -> 0000.0001  || 128 -> 1
