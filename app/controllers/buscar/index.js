import Ember from 'ember';

export default Ember.Controller.extend({
  busqueda: "",

  actions: {
    buscar() {
      if (this.get("busqueda")) {
        this.transitionToRoute("buscar.resultado", this.get("busqueda"));
      }
    }
  }
});
