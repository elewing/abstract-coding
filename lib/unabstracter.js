'use babel';

import { CompositeDisposable } from 'atom';
import literalCommands from './nlp/literals'
import setCommands from './nlp/set'

export default {
  subscriptions: null,

  // Activates and restores previous session of your package.
  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'unabstracter:translate': () => this.translate()
      })
    );
  },

  // When the user or Atom itself kills a window, this is called.
  deactivate() {
    this.subscriptions.dispose();
  },

  // Replaces line with Python interpretation
  translate() {
    let editor = atom.workspace.getActiveTextEditor()

    if (editor) {
      let cursorRow = editor.getCursorBufferPosition().row
      let query = editor.lineTextForBufferRow(cursorRow)
      let translationJSON = this.getTranslation(query)

      if (!translationJSON.error) {
        editor.transact(() => {
          let indentation = editor.indentationForBufferRow(cursorRow)
          editor.selectLinesContainingCursors()
          editor.getLastSelection().insertText(translationJSON.translation + "\n")
          editor.setIndentationForBufferRow(cursorRow, indentation)
          editor.getLastSelection().clear()
        })
      } else {
        atom.notifications.addWarning(translationJSON.errorMessage)
      }
    }
  },

  // Translates text into Python code
  // @param query: Abstract sentence to be translated
  // @return A string of code in Python syntax
  getTranslation(query) {
    let queryArray = query.trim().split(/[ ,]+/)
    switch(queryArray[0]) {
      case "print":
      case "return":
        return literalCommands.literalCommand(query)
      case "assign":
      case "set":
      case "give":
      case "make":
        if (queryArray.includes("string")) {
          return setCommands.setString(query)
        } else if (queryArray.includes("dictionary")) {
          return setCommands.setDict(query)
        } else if (queryArray.includes("list")) {
          return setCommands.setList(query)
        }
      default:
        return {error: true,
                errorMessage: "Your sentence should start with a command; please try again."}
    }
  }
}
