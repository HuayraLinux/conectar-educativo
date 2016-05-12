import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('descargas');
  this.route('misrecursos');
  this.route('buscar', function() {
    this.route('index');
    this.route('resultado', {path: "/buscar/resultado/:busqueda"}, function() {
      this.route('visualizar', {path: "/buscar/resultado/visualizar/:id"});
    });
  });
});

export default Router;
