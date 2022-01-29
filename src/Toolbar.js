import CommandButtonGroup from './CommandButtonGroup';

export default function ToolbarArea({
  $target,
  commandsList,
  executeTextCommand,
  executeMediaCommand,
}) {
  const $toolbarArea = document.createElement('div');

  $toolbarArea.className = 'note-toolbar';

  this.target = $target;
  this.commandsList = commandsList;
  this.target.appendChild($toolbarArea);

  this.textCommandButtonGroup = new CommandButtonGroup({
    $target: $toolbarArea,
    commandsList: this.commandsList['text'],
    action: 'text-command',
    executeTextCommand,
  });

  this.mediaCommandButtonGroup = new CommandButtonGroup({
    $target: $toolbarArea,
    commandsList: this.commandsList['media'],
    action: 'media-command',
    executeMediaCommand,
  });

  const styles = {
    backgroundColor: '#f5f5f5',
    border: '1px solid rgba(0,0,0,0.3)',
    borderBottomWidth: '0px',
    padding: '8px 5px',
    display: 'flex',
  };

  for (const style in styles) {
    $toolbarArea.style[style] = styles[style];
  }

  this.render = () => {
    this.textCommandButtonGroup.render();
    this.mediaCommandButtonGroup.render();
  };
}
