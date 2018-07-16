'use babel';

import NcodaShapeviewView from './ncoda-shapeview-view';
import { CompositeDisposable } from 'atom';

export default {

  ncodaShapeviewView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ncodaShapeviewView = new NcodaShapeviewView(state.ncodaShapeviewViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ncodaShapeviewView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ncoda-shapeview:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ncodaShapeviewView.destroy();
  },

  serialize() {
    return {
      ncodaShapeviewViewState: this.ncodaShapeviewView.serialize()
    };
  },

  toggle() {
    console.log('NcodaShapeview was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
