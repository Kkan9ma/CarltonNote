const styles = {
  backgroundColor: 'pink',
};

export default function ContentEditingArea({ $target, commandsList }) {
  console.log('ContentEditingArea');
  const $contentEditingArea = document.createElement('div');

  $contentEditingArea.className = 'carlton-content-editing-area';
  $contentEditingArea.contentEditable = 'true';

  this.target = $target;
  this.commands = commandsList;
  this.target.appendChild($contentEditingArea);

  for (const style in styles) {
    $contentEditingArea.style[style] = styles[style];
  }

  this.render = () => {
    $contentEditingArea.innerHTML = 'contentEditingArea';
  };
}
