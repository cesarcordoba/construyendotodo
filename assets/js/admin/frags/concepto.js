var app = angular.module('myapp');

app.controller('conceptoCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http,  Concepto, Descripcion, Imagenconcepto, Categoria, Limite, Medida, Tag) {

 	var id = $stateParams.id

 	var self = this

   Tag.obtenerConConcepto(id).then(res => {
	    console.log(res.data)
	    self.tags.items = res.data
	    $scope.$digest();
    })

    self.tags = {

        transformar : async function(text){
        	obj = {}
        	obj.nombre = text;
        	console.log(this.items)

            return this.items.find(n => n.nombre == text) 

             ? (
             	this.filtrar(text)

        		) : (
					Tag.crear(obj).then(res => {
						self.tags.items.push(res.data)
						$scope.$digest();
						Tag.ligar(res.data.id, id).then(res => console.log(res))
					})
    			)
        		
        		

        	return Tag.crear(obj).then(res => {
		    	self.tags.items.push(res.data)
		    	$scope.$digest();
				Tag.ligar(res.data.id, id).then(res => console.log(res))

        	})
        },
        remover : function(item){
        	console.log(item)
           	Tag.desligar(item.id, id).then(res => console.log(res))

        },
        filtrar : async function(text){
    		 console.log(text)
            return Tag.obtener().then(res => res.data);
        },
        seleccion : function(item){
    		 console.log(item)

            Tag.ligar(item.id, id).then(res => console.log(res))
            self.tags.items.push(item)

        }
    }

 	self.limites = {
 		items : [],
 		crear(limite){
		 	
		 	if(limite.id === undefined){
		 		console.log("crear")
	 			Limite.crear(limite, id).then(res => { 
	 				alertas.mostrarToastEstandar("Guardado exitosamente!!!");
	 				self.limites.items.push(res.data);
	 				$scope.$digest();
	 				delete $scope.limite;
	 			})
		 	}
		 	else{
		 		Limite.editar(limite).then(res => { 
		 			alertas.mostrarToastEstandar("Guardado exitosamente!!!");
		 			$scope.mostrar = false;
		 			delete $scope.limite;
		 		})
		 	}

 		},
 		editar(limite){
 			console.log(limite)
 			$scope.mostrar = true;
		 	$scope.limite = limite;
 		},
 		eliminar(limite,idx){

			$mdDialog.show(
				$mdDialog.confirm().title('¿Seguro que quieres eliminar este limite?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
			)
			.then(() => {

				Limite.eliminar(limite.id).then(function(res) {
					self.limites.items.splice(idx, 1)
					alertas.mostrarToastEstandar("Limite eliminado exitosamente");
				})

			})

    	}
 	}

 	class Limites{

 		constructor(arg){
 			this.id = arg.id
 			this.precio = arg.precio,
 			this.min = arg.min,
 			this.max = arg.max,
 			this.id_medida = arg.id_medida
 		
 		}


 		static Obtener(){
			Limite.limiteDeConcepto(id).then(res => {

				self.limites.items = res.data.map(n => new Limites(n))
				console.log(self.limites.items)
				$scope.$digest()
			})
		}
 	}
 	

 	$scope.crearLimite = (limite) => {
 		self.limites.crear(limite);
 	}


 	$scope.editarLimite = (limite) => {
		self.limites.editar(limite);
 	}

 	$scope.eliminarLimite = (limite, idx) => {
 		self.limites.eliminar(limite, idx);
 	}

 	Limites.Obtener()


 	$scope.cerrar = () => {	
 		$scope.mostrar = false;
 		delete $scope.limite;
 }

 	//Obtienen las categorias
 	Categoria.obtener().then(function(res){
 		$scope.categorias = res.data;
 		$scope.$digest();
 		console.log(res.data);
 	})

 	Imagenconcepto.obtenerConConcepto(id).then(res => {
 		$scope.imagenes = res.data;
 		$scope.$digest();
 		//console.log(res.data);

 	})

	//Obtienen las abreviaturas de las medidas
 	Medida.obtener().then(function(res){
 		$scope.medidas = res.data;
 		$scope.$digest();
 		console.log(res.data);
 	})

 	//Obtiene el Concepto
 	Concepto.one(id).then(res => {
 		$scope.concepto = res.data;
 		$scope.$digest();
 		console.log($scope.concepto);
 	})

 	$scope.editarConcepto = (concepto) =>{
 		console.log(concepto)
 		Concepto.editar(concepto).then(res => {
			console.log(res.data);
			alertas.mostrarToastEstandar("Guardado exitosamente!!!");

 		})
 		
 	}

 	
 	$scope.guardarImagen = (imagen) =>{
 		imagenConcepto = {
 			imagen: imagen.imagenconcepto,
 			id_concepto: id
 		}

 		Imagenconcepto.crear(imagenConcepto).then(res => {
 			$scope.imagenes.push(res.data);
 			$scope.$digest();

 		})

 		location.reload();


 	}

	// Eliminar el concepto 
	$scope.eliminarImagen = function(id, $index) {
		console.log(id);
		console.log($index)
		ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar esta imagen?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

		$mdDialog.show(ventana).then(function() {

			Imagenconcepto.eliminar(id).then(function(res) {
				$scope.imagenes.splice($index, 1)
				alertas.mostrarToastEstandar("Imagen eliminada exitosamente");
			})

		}, function() {});
	}

 });
