var app = angular.module('myapp');

app.controller('prospectoCtrl', function($scope, alertas, $rootScope, $http, mdDialog, $mdDialog, Prospecto) {
    // $scope.subsection = 'prospecto';


		Prospecto.obtener().then(res => {
		$scope.prospectos = res.data;
		console.log($scope.prospectos)
		$scope.$digest();
	})

		$scope.abrirDialog = (prospecto) =>{
			console.log(prospecto)

		$rootScope.prospecto = prospecto.id
		$rootScope.nombreprospecto = prospecto.nombre

			$mdDialog.show({
				templateUrl: '/partials/cotizacion',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				bindToController: true,
				preserveScope: true,
				fullscreen: $scope.customFullscreen,
				controller: async function($scope, $mdDialog, alertas, $state, Prospecto, Concepto) {
					$scope.nombre = $rootScope.nombreprospecto

			Promise.all(await Prospecto.cotizaciones($rootScope.prospecto)
			.then(res => res.data.map(async (n) => new Object({ cantidad: n.cantidad, concepto: await Concepto.one(n.id_concepto).then(res => res.data)}))))
			.then(res => $scope.cotizaciones = res)
			.then(() => $scope.$digest())


			$scope.cerrar = () => {$mdDialog.hide(false);}
	

					$scope.close = function() {
						$mdDialog.hide(false);
					}
				}
			})
		}


});
