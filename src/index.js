import CarltonNote from './CarltonNote';

new CarltonNote({
  $target: document.querySelector('#root'),
  commandsList: [
    ['bold', 'italic', 'underline', 'strikethrough'],
    ['image', 'video'],
  ],
});
