import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ce-contador-descargas', 'Integration | Component | ce contador descargas', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{ce-contador-descargas}}`);
  assert.equal(this.$().text().trim(), '0');
});
