import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('huayra-item-resultado', 'Integration | Component | huayra item resultado', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{huayra-item-resultado}}`);

  assert.ok(this.$());

});
