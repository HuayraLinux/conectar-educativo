import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  queue: Ember.inject.service(),
  downloadCounter: Ember.computed("queue.count", function() {
    return this.get("queue.count");
  }),
  hasNewDownloads: Ember.computed('queue.count', function() {
    return (this.get('queue.count') > 0);
  }),
});
