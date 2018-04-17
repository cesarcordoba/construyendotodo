var app = angular.module('myapp');

app.controller('cotizacionCtrl', function($scope, $rootScope, $http, $mdDialog, alertas, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Concepto, Categoria, Limite) {
	var self = this
	var obj = $stateParams.cotizacion
	var subtotal = 0;
	var total = 0;

	self.cotizaciones = []
	self.limites = []

 	if(obj.length === 0){
 		alertas.mostrarToastEstandar("No hay elementos guardados");
 		$state.go('cotizador')
 	}else{

 	
	self.cotizador = {

		 obtener: async function (obj){

		 	console.log(obj)
		 	Promise.all(obj.map(async(n) => new Object({anterior : n, despues : await Concepto.cotizacion(n.idConcepto).then(res => res.data) })))
		 	.then(res =>{ 
		 		self.cotizaciones = res
		 		$scope.$digest()
		 		console.log(self.cotizaciones)
		 	})
 			$scope.$digest()
		},

		obtenerTotal: function(obj){

			Promise.all(obj.map(async(n) => new Object({
		 		cantidad : n, 
		 		limites : await Limite.limiteConMedida(n.idConcepto).then(res => res.data) 
	 			})))	
		 	.then(res => { 
		 		self.limites = res
		 		self.limites.forEach(n => {
					n.limites.every(s => {
						if(n.cantidad.cantidad >= s.min && n.cantidad.cantidad <= s.max ){
							subtotal = s.precio * n.cantidad.cantidad
							console.log(subtotal)
							return false

						}else{
							if(s.max === 0){
								subtotal = s.precio * n.cantidad.cantidad
								console.log(subtotal)
							}
							return true
						}
					})
					n.subtotal = subtotal;
					console.log(subtotal)
					total = subtotal + total
					console.log(total)
				})
				self.limites.push({total: total})
				$scope.$digest()
		 		console.log(self.limites)
		 	})

		},

		eliminarCotizacion: function(concepto, idx){

			ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar este elemento?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

		$mdDialog.show(ventana).then(function() {

			self.cotizaciones.splice(idx, 1)
			$scope.$digest()
			alertas.mostrarToastEstandar("Elemento eliminado correctamente");

		}, function() {});

		},

		ventana: function(cantidad){


			$mdDialog.show({
				templateUrl: '/partials/prospecto',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				bindToController: true,
				preserveScope: true,
				fullscreen: $scope.customFullscreen,
				controller: function($scope, $mdDialog, alertas, $state, Prospecto) {
					$scope.nuevoProspecto = function(prospecto) {
						Prospecto.crear(prospecto).then(res => {
								$mdDialog.hide(res.data);
								$scope.$digest();
								alertas.mostrarToastEstandar("Datos enviados exitosamente");
							})
						}
					$scope.close = function() {
						$mdDialog.hide(false);
					}
				}
			})

		}
	}

	self.cotizador.obtener(obj)
	self.cotizador.obtenerTotal(obj)

}

});
