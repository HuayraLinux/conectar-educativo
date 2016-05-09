import Ember from 'ember';

export default Ember.Controller.extend({
  api: Ember.inject.service(),
  actions: {
    getVideos() {
      this.get('api').getVideos().then((data) => {
        console.log(data);
      });
    },
    abrirDevtools() {
      let nw_gui = requireNode('nw.gui');
      nw_gui.Window.get().showDevTools();
    }
  }
});
