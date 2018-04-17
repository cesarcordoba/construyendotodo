var app = angular.module('myapp');

app.controller('conceptosCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http,  Concepto) {
    
    var self = this


    class Conceptote {
    	constructor(){
    		this.paginas = null,
    		this.pagina = 1,
    		this.item = 5,
    		this.conceptos = []

    	}

    	obtener(){
			Concepto.paginacion(this.item, this.pagina).then(res => {
				console.log(res.data)

				self.conceptos.conceptos = res.data.items.map(n => new Conceptito(n))

				$scope.$digest()
			})
    	}

    	anterior(){ 
    		this.pagina = this.pagina - 1;
    		this.obtener();
    	}
    	siguiente(){ 
    		this.pagina = this.pagina + 1;
    		this.obtener();
    	}

    	nuevo(){

    		$mdDialog.show({
				templateUrl: '/dialogs/concepto',
				parent: angular.element(document.body),
				bindToController: true,
				preserveScope: true,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen,
				controller: function($scope, $mdDialog, alertas, $state, Concepto) {
					$scope.submit = function(concepto) {
						console.log(concepto);
						Concepto.crear(concepto).then(res => {
							$mdDialog.hide();
							$state.go('menuProyectos.concepto',  {id : res.data.id})
						})

						alertas.mostrarToastEstandar("Concepto agregado exitosamente");
						
					}
					$scope.close = function() {
						$mdDialog.hide(false);
					}
				}
			})

    	}
    }

    class Conceptito {
    	constructor(arg){
    		this.id = arg.id,
    		this.nombre = arg.nombre	
    	}

    	eliminar(idx){

			$mdDialog.show(
				$mdDialog.confirm().title('¿Seguro que quieres eliminar este concepto?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
			)
			.then(() => {

				Concepto.eliminar(this.id).then(function(res) {
					self.conceptos.conceptos.splice(idx, 1)
					alertas.mostrarToastEstandar("Concepto eliminado exitosamente");
				})

			})

    	}
    }

    self.conceptos = new Conceptote()
    self.conceptos.obtener()


});

    
