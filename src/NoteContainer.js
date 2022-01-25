import Toolbar from './Toolbar.js';
import ContentEditingArea from './ContentEditingArea.js';

const styles = {
  backgroundColor: 'yellow',
};

export default function NoteContainer({ $target, commandsList }) {
  console.log('note container');
  const $noteContainer = document.createElement('div');

  $noteContainer.id = 'note-container';

  this.target = $target;
  this.commandsList = commandsList;
  this.target.appendChild($noteContainer);

  this.toolbar = new Toolbar({
    $target: $noteContainer,
    commandsList: this.commandsList,
  });
  this.contentEditingArea = new ContentEditingArea({
    $target: $noteContainer,
    commandsList,
  });

  for (const style in styles) {
    $noteContainer.style[style] = styles[style];
  }

  this.render = () => {
    this.toolbar.render();
    this.contentEditingArea.render();
  };
}
