export default function Toolbar({$target}) {
  console.log('Toolbar');
  const $toolbar = document.createElement('ul');

  $toolbar.className = 'carlton-toolbar';

  this.target = $target;
  this.target.appendChild($toolbar);

  this.render = () => {
    $toolbar.innerHTML = 'Toolbar';
  }

  this.render();
}