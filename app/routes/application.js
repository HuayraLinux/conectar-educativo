import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    visitar(url) {
      let nw_gui = requireNode('nw.gui');
      nw_gui.Shell.openExternal(url);
    }
  }
});
