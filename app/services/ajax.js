//import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: 'https://labs.educ.ar',
  namespace: '/1.0/',
});
