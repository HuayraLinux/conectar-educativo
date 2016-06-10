import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["back-button-container"],
  tagName: "li",
  navigator: Ember.inject.service(),

  actions: {
    back() {
      this.get('navigator').back();
    }
  }

});
