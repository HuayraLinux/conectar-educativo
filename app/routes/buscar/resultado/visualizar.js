import Ember from 'ember';

export default Ember.Route.extend({
  api: Ember.inject.service(),

  model(params) {
    return this.get('api').obtenerVideo(params.id);
  },

  actions: {
    toggleModal() {
      let parentModel = this.modelFor('buscar.resultado');
      this.transitionTo('buscar.resultado', parentModel);
    }
  }
});
