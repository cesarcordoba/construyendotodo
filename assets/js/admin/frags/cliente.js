var app = angular.module('myapp');

app.controller('clienteCtrl', function($scope, $state, mdDialog, $mdDialog, alertas, $rootScope, $stateParams, $http, Clientes) {

	var id = $stateParams.id

	Clientes.one(id).then(res => {
		$scope.cliente = res.data;
		$scope.$digest();
	})



	$scope.editarCliente = (cliente) => {
		Clientes.editar(cliente).then(res => {

		})

		$state.go('clientes');
	}
});

    
  