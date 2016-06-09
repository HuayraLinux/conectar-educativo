import Ember from 'ember';

export default Ember.Controller.extend({
  queue: Ember.inject.service(),

  actions: {
    probarDescarga() {
      let item = {video_hd: "pepe.com.ar"};
      this.get("queue").descargar(item);
    }
  }
});
