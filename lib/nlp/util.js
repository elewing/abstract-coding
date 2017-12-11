'use babel';

/** credit: https://stackoverflow.com/a/15327425 */
function format(fmt, ...args){
    return fmt
	.split("%%")
	    .reduce((aggregate, chunk, i) =>
		    aggregate + chunk + (args[i] || ""), "");
}

export default {format};