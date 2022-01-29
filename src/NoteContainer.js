import ToolbarArea from './ToolbarArea.js';
import ContentEditingArea from './ContentEditingArea.js';

const styles = {
  minWidth: '300px',
};

const executeMediaCommand = (command) => {};

const executeTextCommand = (command) => {};

export default function NoteContainer({ $target, commandsList }) {
  const $noteContainer = document.createElement('div');

  $noteContainer.id = 'note-container';

  this.target = $target;
  this.commandsList = commandsList;
  this.target.appendChild($noteContainer);

  this.toolbar = new ToolbarArea({
    $target: $noteContainer,
    commandsList: this.commandsList,
    executeTextCommand,
    executeMediaCommand: executeMediaCommand,
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
