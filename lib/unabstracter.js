'use babel';

import { CompositeDisposable } from 'atom';

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
      let translation = this.getTranslation(query)

      let indentation = editor.indentationForBufferRow(cursorRow).row
      editor.selectLinesContainingCursors()
      editor.setTextInBufferRange(
        editor.getSelectedBufferRange(),
        translation)
    }
  },

  // TODO: Translates text into Python code
  // @param query: Abstract sentence to be translated
  // @return A string of code in Python syntax
  getTranslation(query) {}
}
