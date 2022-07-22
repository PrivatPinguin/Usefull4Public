var idCounter = 0;

function intToString(x, finalLenght){
	// fill id with zero chars of given strLenght
	var xLenght = x.toString().length;
	if(xLenght > finalLenght){
		return intToString(x, finalLenght+1); // catch error. for example x=100 and finalLenght=1
	}
	//fill zeros with count of new finalLenght
	x = x.toString();
	finalLenght -= xLenght 
	while(finalLenght > 0){
		x = "0" + x;
		finalLenght -= 1
	}
	return x;
}
