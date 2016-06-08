var requireNode = require;
window.requireNode = requireNode;

/* Activa el modo livereload */

var Gaze = requireNode('gaze').Gaze;
var gaze = new Gaze('**/*');

gaze.on('all', function(event, filepath) {
  if (window.location) {
    window.location.reload();
  }
});


/* Activa la posibilidad de copiar y pegar en osx */

var gui = requireNode('nw.gui');

if (process.platform === "darwin") {
  var mb = new gui.Menu({type: 'menubar'});

  mb.createMacBuiltin('conectar-educativo', {
    hideEdit: false,
  });

  gui.Window.get().menu = mb;
}
