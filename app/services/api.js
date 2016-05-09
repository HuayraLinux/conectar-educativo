import Ember from 'ember';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),

  getVideos() {
    var params   = {
      app_key: "f540c8a840f87c6aeee18e70735e172516a724c5",
      fields: [],
      filters: [],
      limit: 50,
    };

    var query = encodeURIComponent(JSON.stringify(params));

    return this.get('ajax').request('/videos/' + query);
  },

  /**
   * Realiza una búsqueda completa en la API.
   *
   * Retorna: una promesa que se cumple cuando se obtiene el resultado.
   */
  buscar(termino) {
    var params   = {
      app_key: "f540c8a840f87c6aeee18e70735e172516a724c5",
      search: termino,
      fields: [],
      filters: [],
      limit: 50,
    };

    var query = encodeURIComponent(JSON.stringify(params));

    return this.get('ajax').request('/videos/' + query);
  }
});
