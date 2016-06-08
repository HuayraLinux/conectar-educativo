import Ember from 'ember';

const ESTADO_PENDIENTE = "pendiente";
const ESTADO_INICIANDO = "iniciando";
//const ESTADO_EN_CURSO = "en_curso";
const ESTADO_TERMINADO = "terminado";

export default Ember.Service.extend({
  items: [],
  itemsDescargados: [],
  itemActual: null,
  completedDownloadCounter: 0,
  network: Ember.inject.service(),

  count: Ember.computed('items', function() {
    return this.get('items').length;
  }),

  noHayDescargas: Ember.computed("count", function() {
    return (this.get("count") === 0);
  }),

  _demo: Ember.on("init", function() {
    this.tick();
  }),

  descargar(recurso) {
    recurso.progreso = recurso.progreso || 0;
    this.items.pushObject(recurso);
  },

  tick() {
    if (this.get('isDestroyed') || this.get('isDestroying')) {
      return;
    }

    console.log("iniciar queue tick");

    if (this.get("itemActual") === null) {
      this._seleccionar_primer_item();
    } else {
      if (this.get("itemActual.estado") === ESTADO_TERMINADO) {
        this.set("itemActual", null);
      }
    }

    setTimeout(() => {
      this.tick();
    }, 1000);
  },

  _seleccionar_primer_item() {
    for (let i=0; i < this.get("items").length; i++) {
      if (this.get('items')[i].estado === ESTADO_PENDIENTE) {
        console.log("Seleccionado un item");
        this.set('itemActual', this.get('items')[i]);
        this._iniciar_descarga_item_actual();
        return null;
      } else {
        console.log("No hay items para seleccionar.");
      }
    }
  },

  _iniciar_descarga_item_actual() {
    let item = this.get('itemActual');
    this.set('itemActual.estado', ESTADO_INICIANDO);
    this.get("network").download(item.item.video_hd);
  },

});
