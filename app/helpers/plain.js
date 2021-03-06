import Ember from 'ember';

export function plain(params) {
  var regex = /(<([^>]+)>)/ig;
  var resultText = params[0].replace(regex, "");
  resultText = resultText.replace("&nbsp;", "");
  params[0] = resultText;
  return params;
}

export default Ember.Helper.helper(plain);
