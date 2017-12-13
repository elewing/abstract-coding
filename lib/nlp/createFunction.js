'use babel';

import util from './util';

function createFunction(text) {
    let returnObj = {error: false};
    let words = text.trim().split(/[ ,]+/);
    let object = "function";
    let argsPreposition = "with";
    let fxName, args = "";
    if (words.indexOf(object) == words.length-1) {
	return util.handleError(returnObj, "createFunctionError: No function name given.");
    }
    if (words.includes(argsPreposition)) { 
	if (words.indexOf(argsPreposition) - words.indexOf(object) <= 1) {
	    return util.handleError(returnObj, "createFunctionError: No function name given.");
	}
	if (words.indexOf(argsPreposition) == words.length-1) {
	    return util.handleError(returnObj, "createFunctionError: No arguments given.");
	}
	if (words.includes("argument") && (words.length-1 - words.indexOf("argument") == 1)) {
	    args = words.slice(words.indexOf("argument")+1);
	}
	else if (words.includes("arguments")&& (words.length-1 - words.indexOf("arguments") > 1)) {
	    args = words.slice(words.indexOf("arguments")+1);
	}
	else {
	    args = words.slice(words.indexOf(argsPreposition)+1);
	}
	fxName = words[words.indexOf(argsPreposition)-1];
    }
    else if (words[words.indexOf(object)-1].toLowerCase() === "main") {
	fxName = words[words.indexOf(object)-1];
    }
    else {
	fxName = words[words.length-1];
    }
    let translation = util.format('def %%(%%):', fxName, args);
    returnObj.translation = translation;
    return returnObj;
}

export default {createFunction};