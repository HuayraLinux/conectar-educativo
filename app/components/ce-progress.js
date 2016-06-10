import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['progress'],
  progress: 0,
  style: Ember.computed("progress", function() {
    let progress = this.get("progress");
    return `width: ${progress}%;`.htmlSafe();
  })
});
