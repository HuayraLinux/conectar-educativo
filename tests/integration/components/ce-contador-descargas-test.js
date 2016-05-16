import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ce-contador-descargas', 'Integration | Component | ce contador descargas', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{ce-contador-descargas}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#ce-contador-descargas}}
      template block text
    {{/ce-contador-descargas}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
