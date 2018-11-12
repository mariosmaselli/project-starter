import notify from 'gulp-notify';
import beeper from 'beeper'

export default function (...args) {
  beeper();

  // End the task
  this.emit('end');

  // Notify what's wrong
  notify.onError({
    title: 'Error',
    message: '<%= error.message %>'
  }).apply(this, args);
}
