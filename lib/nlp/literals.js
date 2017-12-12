'use babel';

import util from './util';

export default {
  // Translates abstract print and return commands
  literalCommand(text) {
    let words = text.trim().split(/[ ,]+/)
    let command = words[0]
    let translation, value

    if (words.includes("string")) {
      value = words.slice(2).join(" ")
      translation = util.format('%% "%%"', command, value)
    } else {
      value = words.slice(1).join(" ")
      translation = util.format('%% %%', command, value)
    }

    return {error: false,
            translation: translation}
  }
}
