var app = angular.module('myapp');

app.controller('nuevotemplateCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http, Template, Concepto) {
     //$scope.subsection = 'proyecto';

     //Crear una nuevo Proyecto
    $scope.templatenuevo = function(template){
        console.log(template);
        templates = {
            nombre: template.nombre,
            imagen: 1
        }
        Template.crear(templates).then(function(res){
            $scope.template = (res.data);
            alertas.mostrarToastEstandar("Agregado correctamente");
            $scope.$digest();
            $state.go('template', {id : res.data.id});
        })
    }

    Concepto.obtener().then(function(res){
        $scope.conceptos = res.data;
        $scope.$digest();
        console.log(res.data);
    })

});

    