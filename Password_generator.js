var gpwcha = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
var gpwalp = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
var gpwnum = "0123456789"

function makePW_v1(pwLen) {
	var result           = '';
	var characters       = gpwcha + gpwalp + gpwnum;
	var charactersLength = characters.length;
	for ( var i = 0; i < pwLen; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	if(hasNumber(result) && hasSpecialChars(result)){
		return result;
	}
	return makeid(pwLen);
}

var my_password = makePW_v1(8);
