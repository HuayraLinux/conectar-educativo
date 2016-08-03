import Ember from 'ember';

var fs = requireNode("fs");
var path = requireNode("path");
var nedb = requireNode("nedb");

export default Ember.Service.extend({
  rutaBaseDeDatos: "",
  db: null,

  alIninciar: Ember.on("init", function() {
    this.set("rutaHome", this.obtener_ruta_base_de_datos());

    let rutaBaseDeDatos = path.join(this.get("rutaHome"), "recursos.db");
    this.set("rutaBaseDeDatos", rutaBaseDeDatos);

    let NeDB = nedb;
    this.set('db', new NeDB({filename: rutaBaseDeDatos, autoload: true}));
  }),

  obtener_ruta_base_de_datos() {
    let homedir = "";

    if (process.platform === 'win32') {

      if (fs.existsSync("F:\\conectar-educativo")) {
        homedir = "F:\\conectar-educativo";
      } else {
        homedir = process.USERPROFILE;
      }

    } else {
      if (fs.existsSync("/media/DATOS/conectar-educativo")) {
        homedir = "/media/DATOS/conectar-educativo";
      } else {
        homedir = process.env.HOME;
      }
    }

    return path.join(homedir, ".conectar-educativo");
  },

  obtener_lista_de_recursos() {
    return new Ember.RSVP.Promise((success, reject) => {
      this.get("db").find({}, function(err, result) {
        console.log(err, result);

        if (err) {
          reject(err);
        } else {
          success(result);
        }

      });
    });
  }

});
