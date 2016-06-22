import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  didInsertElement() {
    let img = this.$().find('img')[0];

    img.onerror = (/*error*/) => {
      img.src = "no_image.png";
      return false;
    };

  }
});
