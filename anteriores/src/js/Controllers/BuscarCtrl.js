var app = angular.module('app');
var gui = require('nw.gui');

app.controller('BuscarController', function($scope, $modal, $http, ApiFactory, DescargasFactory, _) {
  $scope.data.query = {};
  $scope.data.buscando = false;
  $scope.data.query.limit = 10;
  $scope.data.query.offset = 0;
  $scope.data.juegos = [];
  $scope.data.videos = [];
  $scope.data.ebooks = [];
  $scope.data.secuencias = [];
  $scope.data.infografias = [];
  $scope.data.recursos = [];
  $scope.data.result = false;
  $scope.data.mostrar =  'todos';


  $scope.$watch('data.juegos', function() {
    $scope.data.cantidad_juegos = $scope.data.juegos.length;
  });

  $scope.$watch('data.videos', function() {
    $scope.data.cantidad_videos = $scope.data.videos.length;
  });

  $scope.$watch('data.ebooks', function() {
    $scope.data.cantidad_ebooks = $scope.data.ebooks.length;
  });

  $scope.$watch('data.secuencias', function() {
    $scope.data.cantidad_secuencias = $scope.data.secuencias.length;
  });

  $scope.$watch('data.infografias', function() {
    $scope.data.cantidad_infografias = $scope.data.infografias.length;
  });







  function alertar_error(data) {
    console.log("BUSQUEDA CONTROLLER -> ERROR");
    console.log(data);
  }

  $scope.buscar = function(){
    $scope.data.query.limit = 10;
    $scope.data.query.offset = 0;
    $scope.data.recursos = [];
    $scope.data.juegos = [];
    $scope.data.videos = [];
    $scope.data.ebooks = [];
    $scope.data.secuencias = [];
    $scope.data.infografias = [];
    $scope.data.buscando = true;

    function success(req, error) {
      console.log("Success return", {successList: req, errorList: error});

      for(var i in req){
        var data = req[i].data;
        $scope.data[data.entity + 's'] = data.result.data;
        _.each(data.result.data, function (recurso) {
          recurso.entity = data.entity;
          $scope.data.recursos.push(recurso);
        });
      }
      $scope.data.recursos = _.sortBy($scope.data.recursos, function(rec){ return -rec.puntaje; });
      $scope.data.result = true;
    };

    ApiFactory.buscar($scope.data.query, success, alertar_error);
  }

  $scope.no_ingreso_busqueda = function() {
    if ($scope.data.query.texto === undefined) {
      return true;
    }

    return (! /\w+/.test($scope.data.query.texto));
  };


  $scope.busquedaPagingFunction = function(){
    if($scope.data.recursos.length > 0){
      $scope.data.query.offset += 10;

      function success(req) {
        var recursos = [];
        for(var i in req){
          console.log(req);
          var data = req[i].data;
          $scope.data[data.entity + 's'].concat(data.result.data);
          _.each(data.result.data, function (recurso) {
            recurso.entity = data.entity;
            recursos.push(recurso);
          });
        }
        recursos = _.sortBy(recursos, function(rec){ return -rec.puntaje; });
        $scope.data.recursos = _.union($scope.data.recursos, recursos);
        $scope.data.result = true;
      };

      ApiFactory.buscar($scope.data.query, success, alertar_error);
    }
  }

  $scope.mostrar = function(filtro) {
    $scope.data.mostrar = filtro;
    console.log($scope.data.mostrar);
    console.log($scope.data[$scope.data.mostrar]);
  }

  var ModalDetalleCtrl = function ($scope, $modalInstance, detalle) {
    $scope.data = {};
    $scope.data.detalle = detalle;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.abrir_pdf = function() {
      console.log("LOG --> ABRIR PDF");
      console.log($scope.data.detalle);
      gui.Shell.openExternal($scope.data.detalle.result.url + "&extension=.pdf");
    }

    $scope.abrir_en_navegador = function(record) {
      gui.Shell.openExternal(record.url);
      console.log(record.url);
    };

    $scope.descargar_video = function(detalle) {
      if (detalle.status.code == 200) {
        DescargasFactory.descargar_video(detalle);
        $modalInstance.close();
      } else {
        alert("ERROR: " + detalle.status.message);
      }
    }
  };


  $scope.abrir_recurso = function(recurso) {

    function success(data) {
      var template = "";

      if (data.status.code === 406) {
        template = 'templates/modal_no_disponible.html';
      } else {
        switch (recurso.entity) {
          case "juego":
              template = 'templates/modal_detalle_juego.html';
              break;
          case "video":
              template = 'templates/modal_detalle_video.html';
              break;
          case "ebook":
              data.corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
              data.mozillaPdfjsUrl = "http://mozilla.github.io/pdf.js/web/viewer.html?file=";
              data.result.url = encodeURIComponent(data.result.url);
              template = 'templates/modal_detalle_ebook.html';
              break;
          case "secuencia":
              template = 'templates/modal_detalle_secuencia.html';
              break;
          case "infografia":
              template = 'templates/modal_detalle_infografia.html';
              break;
          default:
              break;
        }
      }

      var modalInstance = $modal.open({
        templateUrl: template,
        controller: ModalDetalleCtrl,
        resolve: {
          detalle: function() {return data;}
        }
      });
    }

    ApiFactory.obtener_detalle(recurso, success, alertar_error);
  }

  $scope.ver_recurso_en_educar = function(recurso) {
    gui.Shell.openExternal(recurso.visualizacion_educar);
  }


});
