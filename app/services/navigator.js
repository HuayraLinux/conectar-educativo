import Ember from 'ember';

// see: http://stackoverflow.com/questions/20228464/implementing-a-conditional-back-button-in-ember-js

export default Ember.Service.extend({
  history: [],

  notifyTransition(newRoute) {

    if (this.mustTrackThisRoute(newRoute)) {
      this.get('history').pushObject(newRoute);
    }
  },

  mustTrackThisRoute(route) {
    let routesToIgnore = [
    ];

    return (routesToIgnore.indexOf(route) === -1);
  },

  hasHistory: Ember.computed('history.length', function (){
    return (this.get('history.length')>1);
  }),

  back() {
    if (this.get('hasHistory')) {
      this.get('history').popObject();
      window.history.back();
      this.get('history').popObject(); // get rid of route change here, don't need it
    }
  }
});
