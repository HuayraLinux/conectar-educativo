import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-item-resultado'],

  noVideo: Ember.computed(['item.video_hd', 'item.video_sd'], function() {
    return (!this.get('item.video_hd') && !this.get('item.video_sd'));
  }),

});
