'use babel';

import util from './util';

export default {
    /**
     * Set a variable to a string
     * @param text Abstract instruction
     * @return returnObj Python translation / error
     */
    setString(text) {
	let returnObj = {error: false};
	let words = text.trim().split(/[ ,]+/);
	let object = "string";
	let launchPhrasePreposition = "to";
	let command = words[0];
	let variable, value = "";
	switch (command) {
	case "assign":
	case "set":
	    // prep + object that we get from sentence - e.g. to a string, to string, to the string
	    let launchPhrase = words.slice(words.indexOf(launchPhrasePreposition), words.indexOf(object)+1).join(" ");
	    let strippedLaunchPhrase = launchPhrase.replace(" a ", " ").replace(" an ", " ").replace(" the ", " "); // => to string
	    let expectedLaunchPhrase = launchPhrasePreposition+" "+object; // to string
	    // if the second word after "string" is "to"
	    if (words[words.indexOf(object)+2] === launchPhrasePreposition) {
		variable = words[words.indexOf(object)+1];
		value = words.slice(words.indexOf(launchPhrasePreposition)+1);
	    }
	    // if "to string = to string" && first word after command is "to"
	    // in this case, variable would be after the object
	    else if ((strippedLaunchPhrase === expectedLaunchPhrase) && (words[1] === launchPhrasePreposition)) {
		variable = words[words.indexOf(object)+1];
		value = words.slice(words.indexOf(variable)+1);
	    }
	    else {
		variable = words[1];
		value = words.slice(words.indexOf(object)+1);
	    }
	    break;
	case "give":
	case "make":
	    variable = words[1];
	    value = words.slice(words.indexOf(object)+1);
	    break;
	}
	let strvalue = value.join(" ");
	let translation = util.format('%% = "%%"', variable, strvalue);
	returnObj.translation = translation;
	return returnObj;
    },
    
    /**
     * Set a variable to a dictionary
     * @param text Abstract instruction
     * @return returnObj Python translation / error
     */
    setDict(text) {
	let returnObj = {error: false};
	let words = text.trim().split(/[ ,]+/);
	let object = "dictionary";
	let launchPhrasePreposition = "with";
	let command = words[0];
	let variable, key, value = "";
	switch (command) {
	case "give":
	    variable = words[words.indexOf(object)+1];
	    break;
	case "set":
	case "make":
	    if (!words.includes(launchPhrasePreposition)) {
		return util.handleError(returnObj, "setDictError: Invalid launch phrase preposition.");
	    }
	    if (words[words.indexOf(object)+2] === launchPhrasePreposition) {
		variable = words[words.indexOf(object)+1];
	    } else {
		variable = words[1];
	    }
	    break;
	}
	key = words[words.indexOf("key")+1];
	value = words[words.indexOf("value")+1];
	if (isNaN(key)) {
	    key = util.format('"%%"', key);
	}
	if (isNaN(value)) {
	    value = util.format('"%%"', value);
	}
	let translation = util.format('%% = {%%: %%}', variable, key, value);
	returnObj.translation = translation;
	return returnObj;
    },
    
    /**
     * Set a variable to a list of values
     * @param text Abstract instruction
     * @return returnObj Python translation / error
     *
     */
    setList(text) {
	let returnObj = {error: false};
	let words = text.trim().split(/[ ,]+/);
	let object = "list";
	let launchPhrasePreposition = "with";
	let command = words[0];
	let variable, values = "";
	if (!words.includes(launchPhrasePreposition)) {
	    return util.handleError(returnObj, "setListError: Invalid launch phrase preposition");
	}
	switch (command) {
	case "assign":
	case "set":
	    if (words[words.indexOf(object)+2] === launchPhrasePreposition) {
		variable = words[words.indexOf(object)+1];
	    } else {
		variable = words[1];
	    }
	    values = words.slice(words.indexOf(launchPhrasePreposition)+1);
	    values.forEach(function(value, i) {
		    if (isNaN(value)) {
			values[i] = util.format('"%%"', value);
		    }
		});
	    break;
	}
	let translation = util.format('%% = [%%]', variable, values);
	returnObj.translation = translation;
	return returnObj;
    },
    
    /**
     * Set a variable to a number
     * @param text Abstract instruction
     * @return returnObj Python translation / error
     *
     */
    setNum(text) {
	let returnObj = {error: false};
	let words = text.trim().split(/[ ,]+/);
	let launchPhrasePreposition = "to";
	if (words[2] !== launchPhrasePreposition) {
	    return util.handleError(returnObj, "setNumError: Invalid launch phrase preposition");
	}
	if (words.length != 4) {
	    return util.handleError(returnObj, "setNumError: Your command is too complicated.");
	}
	let command = words[0];
	let variable, value = "";
	switch (command) {
	case "assign":
	case "set":
	    if (!isNaN(words[1])) {
		value = words[1];
		variable = words[words.length-1];
	    }
	    else {
		value = words[words.length-1];
		variable = words[1];
	    }
	    break;
	}
	let translation = util.format('%% = %%', variable, value);
	returnObj.translation = translation;
	return returnObj;
    }   
}
