var app = angular.module('myapp');

app.controller('homeCtrl', function($scope, $rootScope, $http, $mdDialog, mdDialog, alertas, $mdExpansionPanel, $mdExpansionPanelGroup, $timeout, $mdSidenav, $state, $stateParams, Categoria, Template, Buscador, Imagen) {

	var self = this;
	console.log("cotizador2")

	if($rootScope.usuario === undefined){

			$mdDialog.show({
			templateUrl: '/partials/prospecto',
			parent: angular.element(document.body),
			bindToController: true,
			preserveScope: true,
			fullscreen: $scope.customFullscreen,
			controller: function($scope, $mdDialog, $rootScope, alertas, $state, Prospecto) {
				$scope.nuevoProspecto = function(prospecto) {
					Prospecto.crear(prospecto).then(res => {
							$rootScope.usuario = res.data;
							$mdDialog.hide(res.data);
							$scope.$digest();
							alertas.mostrarToastEstandar("Datos enviados exitosamente");
						})
					}
			}
			})

	}


	

	self.colapsar = function (){
		$mdExpansionPanelGroup().waitFor('panelGroup').then(function (instance) {
			instance.collapseAll()
		});
	}

	self.expandir = () => self.categorias.forEach(n => $mdExpansionPanel().waitFor(n.id).then(instance => instance.expand()))

	self.colapsar()

	function Comparar(array,valor){

		let algo = array.findIndex(n => n.id === valor.id)

		return array.findIndex(n => n.id === valor.id) > -1 ? true : false

	}

	self.templates = {
		items : [],
		paginas : null,
		pagina : 1,
		limite : 5,
		cambioPagina : function(){

			Template.paginacion(this.limite, this.pagina).then(res => {
				this.paginas = res.data.paginas
				this.items = res.data.items
			})
			.then(() => $scope.$digest())
		}
	}

	class template_ {
		constructor(arg){
			Object.entries(arg).forEach(n => this[n[0]] = n[1])
		}

		obtenerConConcepto(){

			$scope.loading = true

			Template.obtenerConConcepto(this.id)
			.then(response => _.groupBy(response.data, (n) => n.id_categoria))
			.then(response => Object.entries(response))
			.then(response => response.map(n => new Object({
				id : _.toInteger(n[0]),
				Conceptos : n[1].map(n => new Object({ id : _.toInteger(n.id) }))
			})))
			.then(response => self.buscador.procesar(response))
			.then(() => $scope.loading = false)

		}

		async Imagen(id){
			await Imagen.one(id)
			.then(res => res.data)
		}
	}

	self.categorias = []
	self.enviar = []

	class categoria_ {
		constructor(arg){
			this.id = arg.id,
			this.conceptos = arg.Conceptos ? arg.Conceptos : []
		}
	}

	self.buscador = {
		seleccion: function(){},
		obtener: function(){

			this.loading = true;

			Categoria.filtro()
			.then(res => {
				this.procesar(res.data)
				this.loading = false;
			})
			.then(() => $scope.$digest())

			Template.paginacion(self.templates.limite, self.templates.pagina)
			.then(res => self.templates.items = res.data.items.map(n => new template_(n)))
			.then(() => $scope.$digest())

		},
		filtrar: function(text){

			this.loading = true;

			Categoria.buscar({nombre: text})
			.then(res => this.procesar(res.data))
			.then(() => $scope.$digest())

			Template.buscar({nombre: text})
			.then(res => this.procesarT(res.data.items))
			// .then(response => self.templates.items = response.data.items.map(n => new template_(n)))
			// .then(() => console.log(self))
			.then(() => $scope.$digest())

			// return []

		},
		crear: function(){

		},
		procesar : async function(data){
	
			await self.categorias.forEach(n => {

				if(data.length > 0){

					let idx = data.findIndex(s => s.id === n.id)
					if(idx > -1){
						n.conceptos = data[idx].Conceptos
					}else{
						n.conceptos = []
					}


				}else{
					n.conceptos = []
				}

			})

			$scope.$digest()

			await data.forEach(n => {

				if(!Comparar(self.categorias, n)){

					self.categorias.push(new categoria_(n))

				}

			})


			$scope.$digest()

			var algo = await self.categorias.map((n, key) => !Comparar(data, n) && _.isUndefined(n.bloqueo) ? n : false).filter(n => n !== false)
			await algo.forEach(n => {



				self.categorias.splice( self.categorias.findIndex(s => s.id === n.id), 1 )


			})



			$scope.$digest()

			this.loading = false;
		},
		procesarT : function(data){

			data.forEach(n => Comparar(self.templates.items, n) ? null : self.templates.items.push(new template_(n)))
			self.templates.items.forEach((n, key) => (Comparar(data, n)) ? null : self.templates.items.splice(key, 1) )

			this.loading = false;

			$scope.$digest()

		},
		recibo: function(valor, id, cantidad, idConcepto, limite){
			$scope.id = id;
			let idx = self.categorias.findIndex(n => n.id === id)
            self.categorias[idx].bloqueo = valor
            $scope.concepto = {
            	cantidad : cantidad,
            	idConcepto : idConcepto,
            	limite: limite
            }

			self.enviar.push($scope.concepto)
			console.log(self.enviar)
		},
		enviarCotizacion: function() {

			if(self.enviar.length === 0){
				alertas.mostrarToastEstandar("No hay elementos guardados");
			}else{

				$state.go('cotizacion', {cotizacion : self.enviar })

				
			}
						
		}
	}

	self.buscador.obtener()



});
