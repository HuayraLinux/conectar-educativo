import { test } from 'qunit';
import moduleForAcceptance from 'conectar-educativo/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | puede navegar la aplicacion completa');

test('visiting /puede-navegar-la-aplicacion-completa', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.ok((find('p:first').text().indexOf('Hola') > -1), "Existe el mensaje de bienvenida.");

    click("#btn-buscar");
  });

  function buscar(termino, resultadosMinimosEsperados) {
    andThen(function() {
      assert.equal(find("input").length, 1, `Puede ingresar ${termino}`);
      fillIn("input", termino);
      click("button");
    });

    andThen(function() {
      if (resultadosMinimosEsperados > 0) {
        assert.ok(find(".huayra-item-resultado").length > resultadosMinimosEsperados, `Hay más de ${resultadosMinimosEsperados} resultados para ${termino}`);
      } else {
        assert.equal(find(".huayra-item-resultado").length, 0, `No hay ningún resultado para ${termino}`);
      }
    });

  }

  buscar("sarmiento", 20);
  buscar("pilas", 20);
  buscar("san martin", 20);
  buscar("buenos aires", 20);
  buscar("conectar igualdad", 20);

  buscar("argentina", 20);
  buscar("politica", 20);
  buscar("asdadsasdasdadasd", 0);

});
