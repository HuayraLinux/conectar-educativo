import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return params;
  },

  setupController(controller, model) {
    controller.set('busqueda', model.busqueda);
    controller.send('buscar');
  },


  deactivate() {
    this.get('controller').customClear();
  }


});
