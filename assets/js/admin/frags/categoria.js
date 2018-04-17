var app = angular.module('myapp');

app.controller('categoriaCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http,  Categoria, Servicio) {

	var id = $stateParams.id

	//Obtiene la informacion de la Categoria
	Categoria.one(id).then(res => {
		$scope.categoria = res.data;
		$scope.$digest();
		console.log(res.data);
	})

	//Obtiene Servicios disponibles
	Servicio.obtener().then(function(res){
 		$scope.servicios = res.data;
 		$scope.$digest();
 		console.log(res.data);
 	})


	//Edita la Categoria
	$scope.editarCategoria = function(categoria){
		Categoria.editar(categoria).then(res =>	{
			alertas.mostrarToastEstandar("Categoria Editada Correctamente");
		})
	}

	$scope.editarServicio = (servicio) => {
 		console.log($scope.servicio)

 		Servicio.editar($scope.servicio).then(res => console.log(res))
 		alertas.mostrarToastEstandar("Se agrego la servicio a la categoria");
 	}

});

    
  