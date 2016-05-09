import Ember from 'ember';

export default Ember.Controller.extend({

  disableBackspace: Ember.on("init", function() {

    $(document).on("keydown", function (event) {
      if (event.which === 8 && !$(event.target).is("input, textarea")) {
        event.preventDefault();
      }
    });

  }),

});
