app.run([
    '$rootScope',
    '$state',
    '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);

app.config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {

        function template(url, template, controller, oz, params) {
        let obj = {
            url: url,
            params: params,
            views: {
                'main': {
                    templateUrl: template,
                    controller: controller + ' as ctrl'
                }
            },
            resolve: {
                loadMyCtrl: [
                    '$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load([oz]);
                    }
                ]
            }
        }
        return obj
    }

        $urlRouterProvider.otherwise('/');
        $stateProvider
        
        .state('home', template('/', '/main/home', 'homeCtrl', 'mainhome'))

        .state('proyectos', template('/proyectos', '/main/proyectos', 'proyectosCtrl', 'mainproyectos'))
        .state('one', template('/one/:id', '/main/one', 'oneCtrl', 'mainone', { 'id' : null }))
        .state('nosotros', template('/nosotros', '/main/nosotros', 'nosotrosCtrl', 'mainnosotros'))
        //.state('cotizador', template('/cotizador', '/main/cotizador', 'cotizadorCtrl', 'maincotizador'))
        //.state('cotizacion', template('/cotizacion', '/main/cotizacion', 'cotizacionCtrl', 'maincotizacion',  { 'cotizacion' : null }))

    }
]);
