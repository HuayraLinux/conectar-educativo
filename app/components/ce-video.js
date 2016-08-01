import Ember from 'ember';

export default Ember.Component.extend({
  vlc: Ember.inject.service(),
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
    this._conectarEventoResize();
    $(window).resize();
  },

  willDestroyElement() {
    this._desconectarEventoResize();
  },

  _conectarEventoResize() {
    let video = this.$('video');
    let contenedor = $(".ember-modal-dialog");

    $(window).resize(() => {
      let ratio = 0.98;

      let marginTop = ((window.innerHeight - newHeight) / 2) + "px";

      let newWidth = contenedor.innerWidth() * ratio;
      let newHeight = (contenedor.innerHeight() - 30) * ratio;

      video.css("margin-top", marginTop);

      video.css("width", `${newWidth}px`);
      video.css("height", `${newHeight}px`);

    });
  },

  _desconectarEventoResize() {
    $(window).off("resize");
  },

  showError() {
    this.set("error", true);
    this.set('loading', false);
    console.log("Dió error.");
  },


  actions: {
    openInVLC(url) {
      this.get("vlc").play(url);
    }
  }

});
