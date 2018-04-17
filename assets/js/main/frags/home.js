var app = angular.module('myapp');

app.controller('homeCtrl', function($scope, $rootScope, $http, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Servicio, Template) {

	var scrollMagicController = new ScrollMagic.Controller();

    // $('.texto').each(function(){

	[
		{seccion: '.principal', 	clase : '.front',								from : '-80%', 	to : '80%'    },
		{seccion: '.principal',		clase : '.back',								from : '-40%', 	to : '40%'    },
		{seccion: '.albanileria',	clase : '.albanileria .slider-albanileria', 	from : '-40%', 	to : '40%'    },
		{seccion: '.albanileria',	clase : '.albanileria .texto-container', 		from : '-80%', 	to : '80%'    },
		{seccion: '.albanileria',		clase : '.albanileria .texto .md-button', 						from : '-100%',	to : '100%'    },
		{seccion: '.mantenimiento',	clase : '.mantenimiento .slider-mantenimiento', from : '-40%', 	to : '40%'    },
		{seccion: '.mantenimiento',	clase : '.mantenimiento .texto', 				from : '-80%', 	to : '80%'    },
		{seccion: '.mantenimiento',		clase : '.mantenimiento .texto .md-button', 						from : '-100%',	to : '100%'    },
		{seccion: '.diseno',		clase : '.diseno .slider-diseno', 				from : '-40%',	to : '40%'    },
		{seccion: '.diseno',		clase : '.diseno .texto', 						from : '-80%',	to : '80%'    },
		{seccion: '.diseno',		clase : '.diseno .texto .md-button', 						from : '-100%',	to : '100%'    }
	].forEach(n => new ScrollMagic.Scene({
		   triggerElement: n.seccion,
		   triggerHook: .5,
		   duration: $(n.seccion).height()
	   })
	   .setTween(
		   	new TimelineLite()
				.from(n.clase, .02 , {y: n.from, autoAlpha: 0, ease:Power0.easeNone})
				.to(n.clase, .02 , {y: n.to, autoAlpha: 0, ease:Power0.easeNone})
   		)
	    .addTo(scrollMagicController)
	    // .addIndicators()

	)

    // })


	Servicio.obtener()
	.then(res => $scope.servicios = res.data)
	.then(() => $scope.$digest())


	Servicio.albanileria(1).then(res=> {
		array1 = []
		array1 = _.flatten(res.data)
		$scope.albanileria = array1;
		$scope.$digest()
		$( '.slider-albanileria' ).slick({
			dots: false,
			fade: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			cssEase: 'linear'
		})
	})

	Servicio.mantenimiento(2).then(res=> {
		array1 = []
		array1 = _.flatten(res.data)
		$scope.mantenimiento = array1;
		$scope.$digest()
		$( '.slider-mantenimiento' ).slick({
			dots: false,
			fade: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			cssEase: 'linear'
		})
	})

	Servicio.diseno(3).then(res=> {
		array1 = []
		array1 = _.flatten(res.data)
		$scope.diseno = array1;
		$scope.$digest()
		$( '.slider-diseno' ).slick({
			dots: false,
			fade: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			cssEase: 'linear'
		})
	})

	$scope.mover = (id) =>  {$state.go('one', {id : id}) }

});
