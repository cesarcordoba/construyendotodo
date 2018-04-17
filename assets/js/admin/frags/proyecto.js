var app = angular.module('myapp');

app.controller('proyectoCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http, Proyecto, Servicio, Imagen, Template, Clientes) {
     //$scope.subsection = 'proyecto';
    var self = this
    var id = $stateParams.id;

   //obtener el proyecto 
    Proyecto.one(id).then(res => {
        $scope.proyecto = res.data;
        Proyecto.obtenerConServicio(id).then(res => {
            $scope.proyecto.servicio = res.data;
            $scope.$digest();
        })
        console.log($scope.proyecto)
    })


 //  obtiene los servicios disponibles
    Servicio.obtener().then(function(res){
        $scope.servicios = res.data;
        $scope.$digest();
        console.log(res.data);
    })

    Proyecto.obtenerConTemplate(id).then(res => {
        $scope.templecito = res.data;
        $scope.$digest();
        console.log(res.data)
    })

    Template.obtener().then(res => {
         $scope.templates = res.data;
         console.log($scope.templates)
        $scope.$digest()
    })

    $scope.enviarATemplate = (item) =>{
        console.log(item)
        $state.go('menuProyectos.template', {id : item.id});
    }


    $scope.unirATemplate = (item) => {
        Proyecto.unirATemplate(item.id, id).then(res => {
            $scope.templecito.push(item)
            $scope.$digest();
            console.log(res.data)
        })
    }

    $scope.quitarTemplate = (template, idx) => {
        console.log(idx)
        console.log(template.id)

        $mdDialog.show(
                $mdDialog.confirm().title('¿Seguro que quieres eliminar la union de este Template con el Proyecto actual?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
            )
            .then(() => {

                Proyecto.eliminarUnionTemplate(template.id, id).then(res => {
                    console.log(res.data)
                    $scope.templecito.splice(idx, 1)
                    $scope.$digest();
                    alertas.mostrarToastEstandar("Template eliminado exitosamente");
                })
         })
    }

    $scope.editarProyecto = function(proyecto){
        console.log(proyecto);
        Proyecto.unir(proyecto.id, proyecto.servicio[0].id).then(res => {
            console.log(res.data)
            $scope.$digest();

        })

        Proyecto.editar(proyecto).then(res => {
            alertas.mostrarToastEstandar("Se edito el Proyecto");
        })
    }


    Proyecto.obtenerConCliente(id).then(res => {
        console.log(res.data)
        $scope.clientes = res.data;
        $scope.$digest();

    })


    self.cliente = {
        seleccion : function(item){
            $scope.clientes = [];
            obj = {}
            console.log(item)
            obj.id_cliente = item.id;
            obj.id = id;
            console.log(obj)
            Proyecto.agregarCliente(obj).then(res => {
                console.log(res.data)
                $scope.clientes.push(item);
                $scope.$digest()
            })
           

        },
        obtener: async function(){
            await Clientes.obtener().then(res => res.data)
        },
        buscar: function(text){},

        filtrar : async function(text){
            return this.items = text ? this.items.filter(n => n.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1) : (
               await Clientes.obtener().then(res => {
                    console.log(res.data)
                    return this.items = res.data
                })
            )
        },

        crear(text){
             $mdDialog.show(
                $mdDialog.prompt()
                    .title('¿Quieres crear un nuevo Cliente?')
                    .textContent('Empieza por escribir su nombre')
                    .placeholder('Nombre del cliente')
                    .initialValue(text)
                    .ok('Aceptar')
                    .cancel('Cancelar')
                )
                .then(result => {
                    console.log(result)
                    Clientes.crear({nombre : result})
                    .then(res => res.data)
                    .then(clientes => {
                        this.items.push(clientes)
                        $scope.$digest()
                    })

                }).catch(() => {
                    console.log('me cancelaron :(')
                })

            }
    }
    
});
