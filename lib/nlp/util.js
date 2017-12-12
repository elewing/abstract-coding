'use babel';


export default {
    /** credit: https://stackoverflow.com/a/15327425 */
    format(fmt, ...args){
	return fmt
	    .split("%%")
	    .reduce((aggregate, chunk, i) =>
		    aggregate + chunk + (args[i] || ""), "");
    },

    handleError(returnObj, errorMessage) {
	returnObj.error = true;
	returnObj.errorMessage = errorMessage;
	return returnObj;
    },

    hasNumber(string) {
	return /\d/.test(string);
    },

    isArithmeticExpression(string) {
	let re = /([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)/g;
	return re.test(string);
    }
}
