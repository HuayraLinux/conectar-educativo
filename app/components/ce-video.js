import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['video-container'],
  tagName: 'div',
  showVideoProperty: false,
  loading: true,
  error: false,

  videoClass: Ember.computed('showVideoProperty', function() {
    if (this.get('showVideoProperty')) {
      return 'videoVisible';
    } else {
      return 'videoHidden';
    }
  }),

  videoURL: Ember.computed('type', function() {
    if (this.get("type") === "hd") {
      return this.get('model.video_hd');
    } else {
      return this.get('model.video_sd');
    }
  }),

  didInsertElement() {
    let video = this.$('video')[0];

    video.addEventListener("loadeddata", () => {
      Ember.run.scheduleOnce('afterRender', this, 'showVideo');
    }, true);

    video.addEventListener("error", () => {
      Ember.run.scheduleOnce('afterRender', this, 'showError');
    }, true);

  },

  showVideo() {
    this.set('showVideoProperty', true);
    this.set('loading', false);
    console.log("Cargó correctamente.");
  },

  showError() {
    this.set("error", true);
    this.set('loading', false);
    console.log("Dió error.");
  }

});
