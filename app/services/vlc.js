import Ember from 'ember';

export default Ember.Service.extend({
  play(ruta) {
    let exec = requireNode('child_process').exec;
    let comando = null;

    /* Seleccionado el comando correcto para lanzar VLC */
    if (process.platform === 'win32' || process.platform === 'win64') {
      comando = 'c:\\conectar-educativo\\VLCPortable\\VLCPortable.exe "' + ruta + '"';
    }

    if (process.platform === 'linux') {
      comando = 'vlc "' + ruta + '"';
    }

    if (process.platform === 'darwin') {
      comando = 'open -a VLC "' + ruta + '"';
    }


    exec(comando,
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
          console.log('exec error: ' + error);
          alert(error + " Comando " + comando);
        }
    });
  }
});
