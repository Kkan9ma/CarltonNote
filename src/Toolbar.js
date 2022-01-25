import CommandButtonGroup from './CommandButtonGroup';

export default function ToolbarArea({ $target, commandsList }) {
  console.log('Toolbar');
  const $toolbarArea = document.createElement('div');

  $toolbarArea.className = 'note-toolbar';

  this.target = $target;
  this.commandsList = commandsList;
  this.target.appendChild($toolbarArea);

  this.textCommandButtonGroup = new CommandButtonGroup({
    $target: $toolbarArea,
    commandsList: this.commandsList['text'],
    action: 'text-command',
  });

  this.mediaCommandButtonGroup = new CommandButtonGroup({
    $target: $toolbarArea,
    commandsList: this.commandsList['media'],
    action: 'media-command',
  });

  const styles = {
    backgroundColor: 'orange',
    border: '1px solid black',
  };

  for (const style in styles) {
    $toolbarArea.style[style] = styles[style];
  }

  this.render = () => {
    this.textCommandButtonGroup.render();
    this.mediaCommandButtonGroup.render();
  };
}
