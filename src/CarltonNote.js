import NoteContainer from './NoteContainer.js';

const styles = {
  backgroundColor: 'yellowgreen',
};

export default function CarltonNote({ $target, commandsList }) {
  // console.log('Carlton Note');
  const $carltonNote = document.createElement('section');

  $carltonNote.id = 'carlton-note';
  $target.appendChild($carltonNote);

  for (const style in styles) {
    $carltonNote.style[style] = styles[style];
  }

  this.state = {
    commandsList: !commandsList ? [] : commandsList,
  };

  this.noteContainer = new NoteContainer({
    $target: $carltonNote,
    commandsList: this.state.commandsList,
  });

  this.render = () => {
    this.noteContainer.render();
  };

  this.init = () => {
    this.state.commandsList = commandsList;

    this.render();
  };

  this.init();
}
