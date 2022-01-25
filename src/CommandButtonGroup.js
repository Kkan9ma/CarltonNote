function CommandButtonContainer({ command, action }) {
  return `
    <li className='note-button' data-action=${action} style='display: inline-block'>
      <button>${command}</button>
    </li>
  `;
}

export default function CommandButtonGroup({ $target, commandsList, action }) {
  console.log('CommandButtonGroup');
  const $buttonGroup = document.createElement('ul');

  $buttonGroup.className = 'note-button-group';

  this.target = $target;
  this.commandsList = commandsList;

  const styles = {
    listStyle: 'none',
    margin: '0',
    padding: '0',
    border: '1px solid black',
  };

  for (const style in styles) {
    $buttonGroup.style[style] = styles[style];
  }

  this.render = () => {
    console.log(this.commandsList);

    $buttonGroup.innerHTML = `
      ${this.commandsList
        // .map((command) => CommandButtonContainer({ command, action }))
        .map(
          (command) => `
          <li class='note-button-container'  style='display: inline-block'>
            <button 
              class='note-command-button' 
              data-command=${command}
              data-action-type=${action}
            >
              ${command}
            </button>
          </li>`
        )
        .join('')}
    `;
    this.target.appendChild($buttonGroup);
  };
}
