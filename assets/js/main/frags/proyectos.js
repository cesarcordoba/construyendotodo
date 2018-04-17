var app = angular.module('myapp');

app.controller('proyectosCtrl', function($scope, $rootScope, $http, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Proyecto, Template) {

	var self = this;

	self.proyectos = {
		items : [],
		paginas : 5,
		pagina : 1,
		limite : 8,
		obtener : function(){

			Proyecto.obtenerTodosConTemplate(this.limite, this.pagina).then(res => {
				this.paginas = res.data.paginas
				this.items = res.data.items
			})
			.then(res => console.log(this.items))
			.then(() => $scope.$digest())
		},

		anterior: function() {
    		this.pagina = this.pagina - 1;
    		self.proyectos.obtener()

    	},

    	siguiente: function() {
    		this.pagina = this.pagina + 1;
    		self.proyectos.obtener()

    	}
	}

	self.proyectos.obtener()

	$scope.mover = (id) =>  {$state.go('one', {id : id}) }

	self.buscador = {

		seleccion: function(){},
		obtener: function(){

		},
		filtrar: function(text){
			if(text){
				Proyecto.buscar({nombre: text})
				.then(res => self.proyectos.items = res.data)
				.then(() => $scope.$digest())
			}



		},
		crear: function(){

		}

	}

	});
