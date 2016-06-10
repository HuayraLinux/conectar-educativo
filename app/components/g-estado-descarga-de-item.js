import Ember from 'ember';

export default Ember.Component.extend({
  downloading: Ember.computed("item.estado", function () {
    return (this.get("item.estado") === "en_curso");
  })
});
