import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    toggleModal() {
      let parentModel = this.modelFor('buscar.resultado');
      //return {lastName: parentModel.get('name') + 'son' };
      //this.transitionTo("buscar");
      console.log(parentModel);
      this.transitionTo('buscar.resultado', parentModel);
    }
  }
});
