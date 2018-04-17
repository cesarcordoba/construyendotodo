app.factory('AuthService', function($window, $http, Session, $localStorage, alertas, $state) {

    var authService = {};

    authService.registro = function(credentials) {

        $http.post('/data/registro', credentials)
        .success(data => {
            console.log(data);
            // alertas.mostrarToastEstandar("Usuario registrado");
            // Session.create(data.user);
            // $window.location.href = "/user";
            // $localStorage.auth = true;
        })
        .error(err => {
            alertas.mostrarToastEstandar("No se pudo registrar");
            console.log(err);
        });

    };

    authService.login = function(credentials) {
        $http.post('/data/login', credentials)
        .success(data => {
            if(data.token){
                console.log(data);
                Session.create(data.token);
                // $localStorage.auth = true;
                $window.location.href = "/user";
            }else{
                alertas.mostrarToastEstandar("Usuario o contraseña incorrecta");
            }

        })
        .error(function(data){
            console.log(data);
        })
    };

    authService.logout = function() {
        Session.destroy();
    };

    authService.update = function(user) {
        return $http.post( '/user/update', user).then(function(resp) {
            if (resp.status === 200) {
                Session.create(resp.data);
            }
            return resp;
        });
    };

    return authService;
});

app.service('Session', function($localStorage) {
    this.create = function(data) {
        $localStorage.$reset();
        // $localStorage.accessToken = user.access_token;
        $localStorage.token = data;
    };

    this.destroy = function() {
        $localStorage.$reset();
    };
});
