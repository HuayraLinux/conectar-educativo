import Ember from 'ember';

const ESTADO_PENDIENTE = "pendiente";
const ESTADO_INICIANDO = "iniciando";
const ESTADO_EN_CURSO = "en_curso";
const ESTADO_TERMINADO = "terminado";
const ESTADO_ERROR = "error";

const MOSTRAR_MENSAJES_DE_LOG = false;


function log(mensaje) {
  if (MOSTRAR_MENSAJES_DE_LOG) {
    console.log("QUEUE: " + mensaje);
  }
}

export default Ember.Service.extend({
  items: [],
  itemsDescargados: [],
  itemActual: null,
  //completedDownloadCounter: 0,
  network: Ember.inject.service(),

  count: Ember.computed('items.@each', function() {
    return this.get('items').length;
  }),

  completedDownloadCounter: Ember.computed("count", function() {
    return this.get('items').length;
  }),

  noHayDescargas: Ember.computed("count", function() {
    return (this.get("count") === 0);
  }),

  _demo: Ember.on("init", function() {
    this.tick();
  }),

  descargar(recurso) {
    recurso.estado = ESTADO_PENDIENTE;
    recurso.progreso = recurso.progreso || 0;
    this.items.pushObject(recurso);
  },

  tick() {
    if (this.get('isDestroyed') || this.get('isDestroying')) {
      return;
    }

    log("iniciar queue tick");

    if (this.get("itemActual") === null) {
      this._seleccionar_primer_item();
    } else {
      if (this.get("itemActual.estado") === ESTADO_TERMINADO || this.get("itemActual.estado") === ESTADO_ERROR) {
        this.set("itemActual", null);
      } else {
        log("Ya hay una descarga en curso...");
      }
    }

    setTimeout(() => {
      this.tick();
    }, 1000);
  },

  _seleccionar_primer_item() {
    for (let i=0; i < this.get("items").length; i++) {
      if (this.get('items')[i].estado === ESTADO_PENDIENTE) {
        log("Seleccionado un item");
        this.set('itemActual', this.get('items')[i]);
        this._iniciar_descarga_item_actual();
        return null;
      } else {
        log("No hay items para seleccionar.");
      }
    }
  },

  _iniciar_descarga_item_actual() {
    let item = this.get('itemActual');
    this.set('itemActual.estado', ESTADO_INICIANDO);

    this.get("network").download(item.video_hd, (p) => {
      this.set('itemActual.estado', ESTADO_EN_CURSO);
      this.set('itemActual.progreso', p);
      log("PROGRESS DESDE QUEUE: " + p);
    }, (result) => {
      log("DONE DESDE QUEUE: "+ result);
      this.set('itemActual.estado', ESTADO_TERMINADO);
    }, (error) => {
      this.set('itemActual.estado', ESTADO_ERROR);
      this.set('itemActual.error', error);
    });

  },

});
