export default function ContentEditingArea({$target}) {
  console.log('ContentEditingArea');
  const $contentEditingArea = document.createElement('div');

  $contentEditingArea.className = 'carlton-content-editing-area';
  $contentEditingArea.contentEditable = 'true';

  this.target = $target;
  this.target.appendChild($contentEditingArea);

  this.render = () => {
    $contentEditingArea.innerHTML = 'contentEditingArea';
  }

  this.render();
}
