import Ember from 'ember';

export default Ember.Controller.extend({
  api: Ember.inject.service(),

  busqueda: '',
  buscando: false,
  resultado: [],

  /**
   * Limpia el controlador y lo lleva al estado inicial.
   */
  customClear() {
    this.set('busqueda', '');
    this.set('buscando', false);
  },

  actions: {
    buscar() {
      if (this.get("busqueda")) {
        this.set("buscando", true);
        console.log("iniciando la búsqueda de: " + this.get("busqueda"));

        this.get('api').buscar(this.get("busqueda")).then((data) => {
          this.set("buscando", false);
          this.set("resultado", data);
          console.log(data);
        });

      }
    }
  }
});
