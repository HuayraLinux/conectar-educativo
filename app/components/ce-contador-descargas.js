import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  queue: Ember.inject.service(),
  completedDownloadCounter: Ember.computed("queue.completedDownloadCounter", function() {
    return this.get("queue.completedDownloadCounter");
  }),
  hasNewDownloads: Ember.computed('completedDownloadCounter', function() {
    return (this.get('completedDownloadCounter') > 0);
  }),
});
