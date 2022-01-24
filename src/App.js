import CarltonNote from './CarltonNote.js';

export default function App($target) {
  console.log('App');
  this.carltonNote = new CarltonNote({$app: $target});

  this.render = () => {
    this.carltonNote.render();
  }

  this.render();
}
