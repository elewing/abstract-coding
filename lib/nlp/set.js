'use babel';

import util from './util';

export default {
  setString(text) {
    let words = text.split(/[ ,]+/);
    let object = "string";
    let launchPhrasePreposition = "to";
    let command = words[0];
    let variable, key, value;
    if (!words.includes(object)) {
      return;
    }
    switch (command) {
      case "assign":
      case "set":
      // prep + object that we get from sentence - e.g. to a string, to string, to the string
      let launchPhrase = words.slice(words.indexOf(launchPhrasePreposition), words.indexOf(object)+1).join(" ");
      // => to string
      let strippedLaunchPhrase = launchPhrase.replace(" a ", " ").replace(" an ", " ").replace(" the ", " ");
      // to string
      let expectedLaunchPhrase = launchPhrasePreposition+" "+object;
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
      default:
      variable = "error";
      value = ["i", "hate", "this"];
    }
    let strvalue = value.join(" ");
    let translation = util.format('%% = "%%"', variable, strvalue);
    return translation;
  },

  setDict(text) {
    let words = text.split(/[ ,]+/);
    let object = "dictionary";
    let launchPhrasePreposition = "with";
    let command = words[0];
    let variable, key, value;
    if (!words.includes(object)) {
      return;
    }
    switch (command) {
      case "give":
      variable = words[words.indexOf(object)+1];
      break;
      case "set":
      case "make":
      if (!words.includes(launchPhrasePreposition)) {
        return;
      }
      if (words[words.indexOf(object)+2] === launchPhrasePreposition) {
        variable = words[words.indexOf(object)+1];
      } else {
        variable = words[1];
      }
      break;
      default:
      variable = "error";
      key = "error";
      value = "i hate this";
    }
    key = words[words.indexOf("key")+1];
    value = words[words.indexOf("value")+1];
    let translation = util.format('%% = {%%: %%}', variable, key, value);
    return translation;
  },

  setList(words) {
    let object = "list";
    let launchPhrasePreposition = "with";
    let command = words[0];
    let variable, values;
    if (!words.includes(object) || !words.includes(launchPhrasePreposition)) {
      return;
    }
    switch (command) {
      case "assign":
      case "set":
      if (words[words.indexOf(object)+2] === launchPhrasePreposition) {
        variable = words[words.indexOf(object)+1];
      } else {
        variable = words[1];
      }
      values = words.slice(words.indexOf(launchPhrasePreposition)+1)
      break;
      default:
      variable = "error";
      values = ["i", "hate", "this"];
    }
    let translation = util.format('%% = [%%]', variable, values);
    return translation;
  }
}
