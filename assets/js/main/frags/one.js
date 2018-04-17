var app = angular.module('myapp');

app.controller('oneCtrl', function($scope, $rootScope, $http, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Proyecto, Template, Imagenconcepto) {

	var self = this;


	var id = $stateParams.id

	/*Template.one(id).then(res => {

		$scope.template = res.data;
		$scope.$digest();

	})*/


    Proyecto.obtenerConTemplate(id).then(res => {
        Promise.all(res.data.map(async n => Object.assign( n , 
        	{
        		imagenes: await Template.imagenesCompletas(n.id).then(res => res.data),
        		conceptos: await Template.obtenerConConcepto(n.id).then(res => res.data),
        		descripcion: await Template.one(n.id).then(res => res.data)
        	})))
    	.then(response => {
	    	$scope.proyectos = response
	    	$scope.$digest()
	 		console.log($scope.proyectos)

	 		$( '.slider' ).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				fade: true,
				asNavFor: '.slider-nav'
			})

			$('.slider-nav').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: '.slider',
				dots: true,
				arrows: true,
				centerMode: true,
				focusOnSelect: true
			});
		 })
    })


});
