import Ember from 'ember';

export default Ember.Route.extend({
  recursos: Ember.inject.service(),

  model() {
    return this.get("recursos").obtener_lista_de_recursos();
  }
});
