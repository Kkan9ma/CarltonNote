import '@fortawesome/fontawesome-free/js/all.js';

const icons = {
  bold: '<i class="fas fa-bold"></i>',
  italic: '<i class="fas fa-italic"></i>',
  underline: '<i class="fas fa-underline"></i>',
  strikethrough: '<i class="fas fa-strikethrough"></i>',
  image: '<i class="fas fa-images"></i>',
  video: '<i class="fas fa-video"></i>',
};

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
    console.log(icons);
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
                ${icons[command]}
              </button>
            </li>
          `
        )
        .join('')}
    `;
    this.target.appendChild($buttonGroup);
  };
}
