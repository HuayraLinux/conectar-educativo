import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    visitar(url) {
      alert("Visitar la url: " + url);
    }
  }
});
