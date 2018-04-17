var app = angular.module('myapp');

app.controller('proyectosCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http,  Proyecto) {
        
    var self = this

    class Proyectote {
        constructor(){
            this.paginas = 18,
            this.pagina = 4,
            this.items = []

        }

        obtener(){
            Proyecto.obtener().then(res => {
                self.proyectos.items = res.data.map(n => new Proyectito(n))
                $scope.$digest()
            })
        }

        nuevo(){
            $mdDialog.show({
                templateUrl: '/dialogs/nuevoproyecto',
                parent: angular.element(document.body),
                bindToController: true,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                controller: function($scope, $mdDialog, alertas, $state, Proyecto) {
                    $scope.submit = function(proyecto) {
                        console.log(proyecto);
                        Proyecto.crear(proyecto).then(res =>{
                            $mdDialog.hide();
                            $state.go('menuProyectos.proyecto', {id : res.data.id});
                        })

                        alertas.mostrarToastEstandar("Proyecto agregado exitosamente");
                        
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

    class Proyectito {
        constructor(arg){
            this.id = arg.id,
            this.nombre = arg.nombre    
        }

        eliminar(idx){

            $mdDialog.show(
                $mdDialog.confirm().title('¿Seguro que quieres eliminar este Proyecto?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
            )
            .then(() => {

                Proyecto.eliminar(this.id).then(function(res) {
                    self.proyectos.items.splice(idx, 1)
                    alertas.mostrarToastEstandar("Proyecto eliminado exitosamente");
                })

            })

        }
    }

    self.proyectos = new Proyectote()
    self.proyectos.obtener()

});

    