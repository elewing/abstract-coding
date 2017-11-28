'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  // Activates and restores previous session of your package.
  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'unabstracter:translate': () => this.replaceText()
      })
    );
  },

  // When the user or Atom itself kills a window, this is called.
  deactivate() {
    this.subscriptions.dispose();
  },

  // TODO: Replaces line with Python interpretation
  replaceText() {
    }
  },

  // TODO: Translates text into Python code
  // @param query: Abstract sentence to be translated
  // @return A string of code in Python syntax
  translate(query) {}
}
