function intToString(x, finalLenght){
	// fill id with zero chars of given strLenght
	var xLenght = x.toString().length;
	if(xLenght > finalLenght){
		intToString(x, finalLenght+1); // catch error. for example x=100 and finalLenght=1
    return 0;
	}
	

	x = x.toString();
	finalLenght -= xLenght //fill zeros with count of new finalLenght
	while(finalLenght > 0){
		x = "0" + x;
		finalLenght -= 1
	}
  return(x);
}
