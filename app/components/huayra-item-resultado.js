import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-item-resultado'],
  queue: Ember.inject.service(),

  noVideo: Ember.computed(['item.video_hd', 'item.video_sd'], function() {
    return (!this.get('item.video_hd') && !this.get('item.video_sd'));
  }),

  actions: {
    descargar(item) {
      //this.get('queue').descargar({id: 123, item: item, titulo: "Un título", estado: ESTADO_PENDIENTE});
      window.item = item;
    }

  }

});
