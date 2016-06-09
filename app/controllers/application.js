import Ember from 'ember';

export default Ember.Controller.extend({

  disableBackspace: Ember.on("init", function() {

    // Previene que se pueda usar BACKSPACE para regresar a la ruta anterior.
    $(document).on("keydown", function (event) {
      if (event.which === 8 && !$(event.target).is("input, textarea")) {
        event.preventDefault();
      }
    });


    // Permite abrir las developer tools pulsando CMD+I
    $(document).keypress(function(event) {

      if (event.which === 105 && (event.ctrlKey || event.metaKey) || (event.which === 19)) {
        event.preventDefault();

        let nw_gui = requireNode('nw.gui');
        nw_gui.Window.get().showDevTools();
        return false;
      }

      return true;
    });

  }),

});
