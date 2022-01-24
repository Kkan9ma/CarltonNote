import Toolbar from './Toolbar.js';
import ContentEditingArea from './ContentEditingArea.js';

export default function NoteContainer({$target}) {
  console.log('note container');
  const $noteContainer = document.createElement('div');

  $noteContainer.id = 'note-container';

  this.target = $target;
  this.target.appendChild($noteContainer);

  this.toolbar = new Toolbar({$target: $noteContainer});
  this.contentEditingArea= new ContentEditingArea({$target: $noteContainer});

  this.render = () => {
    this.toolbar.render();
    this.contentEditingArea.render();
  }

  this.render();
}
