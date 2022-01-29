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
    <li class='note-button' data-action=${action} style='display: inline-block'>
      <button>${command}</button>
    </li>
  `;
}

export default function CommandButtonGroup({
  $target,
  commandsList,
  action,
  executeTextCommand,
  executeMediaCommand,
}) {
  console.log('CommandButtonGroup');
  const $buttonGroup = document.createElement('ul');

  $buttonGroup.className = `note-button-group ${action}`;
  this.target = $target;
  this.commandsList = commandsList;

  const styles = {
    listStyle: 'none',
    margin: '0 20px 0 0 ',
    padding: '0',
  };

  for (const style in styles) {
    $buttonGroup.style[style] = styles[style];
  }

  const handleClick = (event) => {
    const { target } = event;

    const button =
      target.closest('button') === null
        ? target.querySelector('button')
        : target.closest('button');

    const { actionType } = button.dataset;
    const { command } = button.dataset;

    if (target.tagName === 'UL') {
      return;
    }
    if (actionType === 'text-command') {
      executeTextCommand(command);

      return;
    }
    if (actionType === 'media-command') {
      executeMediaCommand(command);
    }
  };

  this.render = () => {
    $buttonGroup.innerHTML = `
      ${this.commandsList
        // .map((command) => CommandButtonContainer({ command, action }))
        .map(
          (command) => `
            <li class='note-button-container' style='display: inline-block'>
              <button 
                class='note-command-button'
                data-command=${command}
                data-action-type=${action}
                style='
                  border-width: 1px; 
                  /*border-style: solid;*/
                  border-radius: 2px;
                  padding: 6px 9px;
                  border-color: #ccc;
                  background-color: #fff
                '
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

  this.bindEvents = () => {
    // const  = this.target.querySelector(`.${action}`);
    // const buttons = $buttonGroup.querySelectorAll('button');

    // buttons.forEach((button) => {
    //   button.addEventListener('click', (event) => {
    //     onClick(event);
    //   });
    // });

    $buttonGroup.addEventListener('click', (event) => {
      handleClick(event);
    });
  };

  this.render();
  this.bindEvents();
}
