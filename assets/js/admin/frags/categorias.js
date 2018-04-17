var app = angular.module('myapp');

app.controller('categoriasCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http,  Categoria) {
    
     	//Obtener categorias
	Categoria.obtener().then(res => {
		$scope.categorias = res.data;
		console.log($scope.categorias)
		$scope.$digest();
	})

		//Crear una nueva categoria
	$scope.nuevo = function(ev) {
		$mdDialog.show({
			templateUrl: '/dialogs/categoria',
			parent: angular.element(document.body),
			bindToController: true,
			preserveScope: true,
			fullscreen: $scope.customFullscreen,
			controller: function($scope, $mdDialog, alertas, $state, Categoria) {
				$scope.submit = function(categoria) {
					console.log(categoria);
					Categoria.crear(categoria).then(res => {
						$mdDialog.hide();
						$state.go('categoria',  {id : res.data.id})
					})

					 alertas.mostrarToastEstandar("Categoria agregada exitosamente");
				}
				$scope.close = function() {
					$mdDialog.hide(false);
				}
			}
		})
	}

	// Eliminar la categoria 
	$scope.eliminarCategoria = function(categoria, $index) {
		console.log($index);
		ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar esta categoria?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

		$mdDialog.show(ventana).then(function() {

			Categoria.eliminar(categoria.id).then(function(res) {
				$scope.categorias.splice($index, 1)
				alertas.mostrarToastEstandar("Categoria eliminada exitosamente");
			})

		}, function() {});
	}

});

    
