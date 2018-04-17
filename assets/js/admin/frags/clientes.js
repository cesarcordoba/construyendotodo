var app = angular.module('myapp');

app.controller('clientesCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http, Clientes) {

	var self = this

    class Clientesote {
        constructor(){
            this.paginas = 18,
            this.pagina = 4,
            this.items = []

        }

        obtener(){
            Clientes.obtener().then(res => {
                self.clientes.items = res.data.map(n => new Clientecito(n))
                $scope.$digest()
            })
        }

        nuevo(){
            $mdDialog.show({
                templateUrl: '/dialogs/nuevocliente',
                parent: angular.element(document.body),
                bindToController: true,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                controller: function($scope, $mdDialog, alertas, $state, Clientes) {
                    $scope.submit = function(cliente) {
                        console.log(cliente);
                        Clientes.crear(cliente).then(res =>{
                            $mdDialog.hide();
                            $state.go('cliente', {id : res.data.id});
                        })

                        alertas.mostrarToastEstandar("Cliente agregado exitosamente");
                        
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

    class Clientecito {
        constructor(arg){
            this.id = arg.id,
            this.nombre = arg.nombre    
        }

        eliminar(idx){

            $mdDialog.show(
                $mdDialog.confirm().title('¿Seguro que quieres eliminar este Cliente?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
            )
            .then(() => {

                Clientes.eliminar(this.id).then(function(res) {
                    self.clientes.items.splice(idx, 1)
                    alertas.mostrarToastEstandar("Cliente eliminado exitosamente");
                })

            })

        }
    }

    self.clientes = new Clientesote()
    self.clientes.obtener()

});

    
  