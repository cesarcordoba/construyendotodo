var app = angular.module('myapp');

app.controller('templatesCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http,  Template) {
    
	var self = this

    class Contenedor {
        constructor(){
            this.paginas = 18,
            this.pagina = 4,
            this.items = []

        }

        obtener(){
            Template.obtener().then(res => {
                self.templates.items = res.data.map(n => new TemplateSolito(n))
                $scope.$digest()
            })
        }

        nuevo(){
            $mdDialog.show({
                templateUrl: '/dialogs/nuevotemplate',
                parent: angular.element(document.body),
                bindToController: true,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                controller: function($scope, $mdDialog, alertas, $state, Template) {
                    $scope.submit = function(template) {
                        console.log(template);
                        Template.crear(template).then(res =>{
                            $mdDialog.hide();
                            $state.go('menuProyectos.template', {id : res.data.id});
                        })

                        alertas.mostrarToastEstandar("Template agregado exitosamente");
                        
                    }
                    $scope.close = function() {
                        $mdDialog.hide(false);
                    }
                }
            })

        }
        
        cambioPagina(){
            console.log('si estoy cambiando de pagina')
        }
    }

    class TemplateSolito {
        constructor(arg){
            this.id = arg.id,
            this.nombre = arg.nombre    
        }

        eliminar(idx){

            $mdDialog.show(
                $mdDialog.confirm().title('¿Seguro que quieres eliminar este Template?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
            )
            .then(() => {

                Template.eliminar(this.id).then(function(res) {
                    self.templates.items.splice(idx, 1)
                    alertas.mostrarToastEstandar("Template eliminado exitosamente");
                })

            })

        }
    }

    self.templates = new Contenedor()
    self.templates.obtener()








































     	//Obtener templates
	Template.obtener().then(res => {
		$scope.templates = res.data;
		console.log($scope.templates)
		$scope.$digest()
	})


	// Eliminar el template 
	$scope.eliminarTemplate = function(template, $index) {
		console.log($index);
		ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar este template?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

		$mdDialog.show(ventana).then(function() {

			Template.eliminar(template.id).then(function(res) {
				$scope.templates.splice($index, 1)
				alertas.mostrarToastEstandar("Template eliminado exitosamente");
			})

		}, function() {});
	}

});

    
