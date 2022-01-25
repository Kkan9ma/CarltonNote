const styles = {
  backgroundColor: 'orange',
};

function CommandButton(command) {
  const $button = document.createElement('button');

  $button.innerHTML = command;

  return $button;
}

function CommandButtonContainer(command) {
  const $container = document.createElement('li');

  $container.className = 'note-button';
  $container.appendChild(CommandButton(command));

  return $container;
}

export default function Toolbar({ $target, commandsList }) {
  console.log('Toolbar');
  const $toolbar = document.createElement('div');

  $toolbar.className = 'carlton-toolbar';

  this.target = $target;
  this.commandsList = commandsList;
  this.target.appendChild($toolbar);

  this.commandGroup = '';

  for (const style in styles) {
    $toolbar.style[style] = styles[style];
  }

  this.render = () => {
    const commandGroupsHTMLString = `
      <ul class='note-button-group'>
        ${this.commandsList
          .map((commandArr) =>
            commandArr
              .map(
                (command) => `
              <li class='note-button'>
                ${CommandButtonContainer(command).innerHTML}
              </li>
            `
              )
              .join('')
          )
          .join('')}
      </ul>
    `;

    $toolbar.innerHTML = commandGroupsHTMLString;
  };

  this.init = () => {
    this.render();
  };

  this.init();
}
