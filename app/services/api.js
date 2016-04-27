import Ember from 'ember';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  getVideos() {
    var params   = {
      app_key: "f540c8a840f87c6aeee18e70735e172516a724c5",
      fields: [],
      filters: [],
      limit: 50,
    };

    var query = encodeURIComponent(JSON.stringify(params));

    return this.get('ajax').request('/videos/' + query);
  }
});
