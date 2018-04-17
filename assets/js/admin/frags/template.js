var app = angular.module('myapp');

app.controller('templateCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http,  Template, Concepto, Servicio, Categoria, Imagen) {

	var id = $stateParams.id;

	Imagen.obtenerDeTemplate(id).then(res => {
		$scope.imagenes = res.data;
		$scope.$digest();
		console.log($scope.imagenes)
	})

	Template.one(id).then(res => {
		$scope.template = res.data;
		$scope.$digest();
		console.log($scope.template)
			Template.obtenerConConcepto(id).then(res => {
			$scope.template.concepto = res.data;
			$scope.$digest();
		})

	})

 	Concepto.obtener().then(function (res){
 		$scope.conceptos = res.data;
 		$scope.$digest();
 		console.log(res.data);
 	})

 	Template.obtenerConConcepto(id).then(res => {
        $scope.conceptito = res.data;
        $scope.$digest();
        console.log(res.data)
    })
 
 	$scope.editarTemplate = (template) => {

 		obj = {
 			nombre: template.nombre,
 			descripcion: template.Descripcion.descripcion
 		}
 		
 		/*Template.unir(template.id, template.concepto[0].id).then(res => {
 			console.log(res.data)
			$scope.$digest();

 		})*/

 		Template.editar(template).then(res => {
 			console.log(res.data);
			$scope.$digest();
 			alertas.mostrarToastEstandar("Guardado exitosamente!!!");
 		}) 

 		//$state.go('cotizador.templates')
 	}

 	$scope.guardarImagen = (imagen) =>{
 		var imagen2 = 'data:image/png;base64,' + imagen.base64;
 		console.log(imagen2)
 		imagenTemplate = {
 			imagen: imagen2,
 			id_template: id
 		}

 		Imagen.crear(imagenTemplate).then(res => {
 			console.log(res.data)
 			$scope.imagenes.push(res.data);
 			$scope.$digest();

 		})

 		location.reload();


 	}

	// Eliminar el concepto 
	$scope.eliminarImagen = function(id, $index) {
		console.log(id);
		console.log($index)
		ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar esta Imagen?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

		$mdDialog.show(ventana).then(function() {

			Imagen.eliminar(id).then(function(res) {
				$scope.imagenes.splice($index, 1)
				alertas.mostrarToastEstandar("Imagen eliminada exitosamente");
			})

		}, function() {});
	}


	$scope.enviarAConcepto = (item) =>{
        console.log(item)
        $state.go('menuProyectos.concepto', {id : item.id});
    }


    $scope.unirAConcepto = (item) => {
        Template.unirAConcepto(item.id, id).then(res => {
            $scope.conceptito.push(item)
            $scope.$digest();
            console.log(res.data)
        })
    }

    $scope.quitarConcepto = (concepto, idx) => {
        console.log(idx)
        console.log(concepto.id)

        $mdDialog.show(
                $mdDialog.confirm().title('¿Seguro que quieres eliminar la union de este concepto con el template?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
            )
            .then(() => {

                Template.eliminarUnionConcepto(concepto.id, id).then(res => {
                    console.log(res.data)
                    $scope.conceptito.splice(idx, 1)
                    $scope.$digest();
                    alertas.mostrarToastEstandar("Concepto eliminado exitosamente");
                })

            })

       
    }



});