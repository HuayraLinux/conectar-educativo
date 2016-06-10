import Ember from 'ember';

//var fs = requireNode('fs');
//var fsextra = requireNode('fs-extra');
var http = requireNode('http');
//var path = requireNode('path');

//var fs = requireNode('fs');
//var request = requireNode('request');
//var progress = requireNode('request-progress');

export default Ember.Service.extend({
  download(url, progress_callback, done_callback, error_callback) {
    var objeto = {
      transmitido_en_bytes: 0,
      total_en_bytes: 0,
      progreso: 0
    };

    http.get(url, function(res) {
      objeto.total_en_bytes = parseInt(res.headers['content-length'], 10);

      res.on('data', function(chunk) {

        //file.write(chunk);
        objeto.transmitido_en_bytes += chunk.length;
        objeto.progreso = Math.floor((objeto.transmitido_en_bytes / objeto.total_en_bytes) * 100);

        progress_callback(objeto.progreso);

        //if (objeto.estado === 'cancelado') {
        //  res.destroy();
        //  DataBus.emit('termina-descarga', {});
        //}
      });

      res.on('end', function() {

        // Si la descarga es exitosa ...
        if (parseInt(objeto.transmitido_en_bytes, 10) === parseInt(objeto.total_en_bytes, 10)) {
          objeto.transmitido_en_bytes = objeto.total_en_bytes;
          objeto.progreso = Math.floor((objeto.transmitido_en_bytes / objeto.total_en_bytes) * 100);

          done_callback("ok");

          /*
          if (fs.existsSync(directorio_recurso_temporal)) {
            objeto.estado = 'terminado';
            //fs.renameSync(directorio_recurso_temporal, directorio_recurso);
            fsextra.copySync(directorio_recurso_temporal, directorio_recurso, undefined, true);
            rmdir(directorio_recurso_temporal);

            crear_miniatura(directorio_recurso, function() {
              RecursosFactory.agregar_recurso(objeto.detalle);
              DataBus.emit('termina-descarga', objeto.detalle);
            });

          } else {
            objeto.estado = 'error';
            DataBus.emit('termina-descarga', objeto.detalle);
          }
          */

        }

      });

      res.on('close', function () {
        //objeto.estado = 'error';
        //rmdir(directorio_recurso_temporal);
        //DataBus.emit('termina-descarga', objeto.detalle);
      });

    }).
    on('error', function(error) {
      error_callback(error.message);
      //objeto.estado = 'error';
      //rmdir(directorio_recurso_temporal);
      //DataBus.emit('termina-descarga', {});
    });

/*

      var objeto = {
        id_descarga: id_random,
        progreso: 0,
        transmitido_en_bytes: 0,
        tipo: 'video',
        estado: 'descargando',
        detalle: detalle_del_video,
      }

      var nombre = 'video.mp4';
      var ruta_descargas = PerfilFactory.obtener_path_descargas();
      var directorio_recurso = path.join(ruta_descargas, id_recurso.toString());
      var directorio_recurso_temporal = path.join(ruta_descargas, '_incompleto__' + id_recurso.toString());

      var ruta_completa = path.join(directorio_recurso, nombre);
      var ruta_completa_temporal = path.join(directorio_recurso_temporal, nombre);

      fs.exists(directorio_recurso, function(existe) {

        // Verifica además si el recurso se está descargando ...
        if (fs.existsSync(directorio_recurso_temporal)) {

          if (existe_en_lista_descargas_en_curso(obj, id_recurso)) {
            existe = true;
          } else {
            // Elimina el directorio, dado que puede ser una descarga vieja, a causa
            // de que el programa ha fallado o algo así.
            rmdir(directorio_recurso_temporal);
            existe = false;
          }
        }

        // Evita descargar si ya lo descargó (o si está en curso).
        if (existe) {

          var mensaje_error = "El directorio '" + directorio_recurso + "' ya existe, parece que el recurso ya se descargó.";

          if (callback)
            callback.call(this, mensaje_error, "");

        } else {

          fs.mkdirSync(directorio_recurso_temporal);

          var file = fs.createWriteStream(ruta_completa_temporal);

          http.get(objeto.detalle.result.url, function(res) {
                  objeto.total_en_bytes = res.headers['content-length'];

                  res.on('data', function(chunk) {
                      file.write(chunk);
                      objeto.transmitido_en_bytes += chunk.length;
                      objeto.progreso = Math.floor((objeto.transmitido_en_bytes / objeto.total_en_bytes) * 100)

                      if (objeto.estado === 'cancelado') {
                        res.destroy();
                        DataBus.emit('termina-descarga', {});
                      }
                  });

                  res.on('end', function() {

                      // Si la descarga es exitosa ...
                      if (objeto.transmitido_en_bytes == objeto.total_en_bytes) {
                          objeto.transmitido_en_bytes = objeto.total_en_bytes;
                          objeto.progreso = Math.floor((objeto.transmitido_en_bytes / objeto.total_en_bytes) * 100)

                          if (fs.existsSync(directorio_recurso_temporal)) {
                            objeto.estado = 'terminado';
                            //fs.renameSync(directorio_recurso_temporal, directorio_recurso);
                            fsextra.copySync(directorio_recurso_temporal, directorio_recurso, undefined, true);
                            rmdir(directorio_recurso_temporal);

                            crear_miniatura(directorio_recurso, function() {
                              RecursosFactory.agregar_recurso(objeto.detalle);
                              DataBus.emit('termina-descarga', objeto.detalle);
                            });

                          } else {
                            objeto.estado = 'error';
                            DataBus.emit('termina-descarga', objeto.detalle);
                          }

                      }

                  });

                  res.on('close', function () {
                      objeto.estado = 'error';
                      rmdir(directorio_recurso_temporal);
                      DataBus.emit('termina-descarga', objeto.detalle);
                  });

              }).
              on('error', function() {
                  objeto.estado = 'error';
                  rmdir(directorio_recurso_temporal);
                  DataBus.emit('termina-descarga', {});
              });

          obj.descargas_en_curso.push(objeto);

          DataBus.emit('inicia-descarga', {});
        }
      })
    }

*/


    /*
    progress(url);
    progress(url);
    progress(url);
    progress(url);
    progress(url);
    progress(url);

    setTimeout(done, 5000);
    */

  }
});
