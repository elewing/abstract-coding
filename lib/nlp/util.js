'use babel';

export default {
    /**
     * String formatter
     * @param fmt Format specifier
     * @returns fmt Formatted string
     * credit: https://stackoverflow.com/a/15327425 
     */
    format(fmt, ...args){
	return fmt
	    .split("%%")
	    .reduce((aggregate, chunk, i) =>
		    aggregate + chunk + (args[i] || ""), "");
    },
    
    /**
     * Generate an appropriate error json depending on the
     * error and message passed to it.
     */
    handleError(returnObj, errorMessage) {
	returnObj.error = true;
	returnObj.errorMessage = errorMessage;
	return returnObj;
    },
	
    /**
     * Check if given string contains a number
     */
    hasNumber(string) {
	return /\d/.test(string);
    }
}
