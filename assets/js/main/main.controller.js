app.controller('mainCtrl', function ($scope, $rootScope, $http, mdDialog, AuthService, $localStorage) {

    $localStorage.usuario = false;


    $scope.registro = function(usuario){
        AuthService.registro(usuario);
    }

    $scope.login = function(x){
        AuthService.login(x);
    }

	_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });

    $scope.iniciosesion = function (ev) {
        mdDialog.mostrardialog('login', 'mainCtrl', $scope.customFullscreen);
    };

    $scope.registrarse = function() {
        mdDialog.mostrardialog('registro', 'mainCtrl', $scope.customFullscreen);
    }

    $scope.botones = [{
        title: 'Home',
        icon: 'whatshot',
        color: 'red',
        sref: 'home'
    }];

});
