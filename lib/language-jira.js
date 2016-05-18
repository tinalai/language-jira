'use babel';

import LanguageJiraView from './language-jira-view';
import { CompositeDisposable } from 'atom';

export default {

  languageJiraView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageJiraView = new LanguageJiraView(state.languageJiraViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageJiraView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-jira:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageJiraView.destroy();
  },

  serialize() {
    return {
      languageJiraViewState: this.languageJiraView.serialize()
    };
  },

  toggle() {
    console.log('LanguageJira was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
