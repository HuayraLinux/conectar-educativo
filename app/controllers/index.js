import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    abrirDevtools() {
      let nw_gui = requireNode('nw.gui');
      nw_gui.Window.get().showDevTools();
    }
  }
});
