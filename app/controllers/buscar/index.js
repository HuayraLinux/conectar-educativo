import Ember from 'ember';

export default Ember.Controller.extend({
  busqueda: "",

  actions: {
    buscar() {
      this.transitionToRoute("buscar.resultado", this.get("busqueda"));
    }
  }
});
