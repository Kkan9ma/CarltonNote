import NoteContainer from './NoteContainer.js';

export default function CarltonNote({$app}) {
  console.log('Carlton Note');
  const $carltonNote = document.createElement('section');

  $carltonNote.id = 'carltonNote'
  $app.appendChild($carltonNote);

  this.noteContainer = new NoteContainer({$target: $carltonNote});

  this.render = () => {
    this.noteContainer.render();
  }
}
