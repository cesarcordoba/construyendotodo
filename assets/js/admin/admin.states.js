app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {


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
	.state('home', template('/', '/admin/home', 'homeCtrl', 'adminhome'))

	.state('menuProyectos', template('/menuproyectos', '/admin/menuproyectos', 'menuproyectosCtrl', 'adminmenuproyectos'))
	.state('menuProyectos.proyectos', template('/proyectos', '/admin/proyectos', 'proyectosCtrl', 'adminproyectos'))
	.state('menuProyectos.proyecto', template('/proyecto/:id', '/admin/proyecto', 'proyectoCtrl', 'adminproyecto', { 'id' : null }))

	.state('menuProyectos.templates', template('/templates', '/admin/templates', 'templatesCtrl', 'admintemplates'))
	.state('menuProyectos.template', template ('/template/:id', '/admin/template', 'templateCtrl', 'admintemplate', { 'id' : null }))

	.state('menuProyectos.conceptos', template ('/conceptos', '/admin/conceptos', 'conceptosCtrl', 'adminconceptos'))
	.state('menuProyectos.concepto', template ('/concepto/:id', '/admin/concepto', 'conceptoCtrl', 'adminconcepto', { 'id' : null }))
	
	.state('clientes', template('/clientes', '/admin/clientes', 'clientesCtrl', 'adminclientes'))
	.state('cliente', template('/cliente/:id', '/admin/cliente', 'clienteCtrl', 'admincliente', { 'id' : null }))
	
	.state('categorias', template ('/categorias', '/admin/categorias', 'categoriasCtrl', 'admincategorias'))
	.state('categoria', template ('/categoria/:id', '/admin/categoria', 'categoriaCtrl', 'admincategoria', { 'id' : null }))

	.state('prospecto', template('/prospecto', '/admin/prospecto', 'prospectoCtrl', 'adminprospecto'))


	/*
	.state('cotizador', template('/cotizador', '/admin/cotizador', 'cotizadorCtrl', 'admincotizador'))
	.state('cotizador.conceptos', template ('/conceptos', '/admin/conceptos', 'conceptosCtrl', 'adminconceptos'))
	.state('concepto', template ('/concepto/:id', '/admin/concepto', 'conceptoCtrl', 'adminconcepto', { 'id' : null }))

	.state('cotizador.categorias', template ('/categorias', '/admin/categorias', 'categoriasCtrl', 'admincategorias'))
	.state('categoria', template ('/categoria/:id', '/admin/categoria', 'categoriaCtrl', 'admincategoria', { 'id' : null }))

	.state('cotizador.templates', template ('/templates', '/admin/templates', 'templatesCtrl', 'admintemplates'))
	.state('nuevotemplate', template ('/nuevotemplate', '/admin/nuevotemplate', 'nuevotemplateCtrl', 'adminnuevotemplate'))
	.state('template', template ('/template/:id', '/admin/template', 'templateCtrl', 'admintemplate', { 'id' : null }))

	.state('menuProyectos', template('/menuproyectos', '/admin/menuproyectos', 'menuproyectosCtrl', 'adminmenuproyectos'))
	.state('menuProyectos.proyectos', template('/proyectos', '/admin/proyectos', 'proyectosCtrl', 'adminproyectos'))
	.state('proyecto', template('/proyecto/:id', '/admin/proyecto', 'proyectoCtrl', 'adminproyecto', { 'id' : null }))
	
	.state('menuProyectos.clientes', template('/clientes', '/admin/clientes', 'clientesCtrl', 'adminclientes'))
	.state('cliente', template('/cliente/:id', '/admin/cliente', 'clienteCtrl', 'admincliente', { 'id' : null }))
	
	.state('prospecto', template('/prospecto', '/admin/prospecto', 'prospectoCtrl', 'adminprospecto'))
	*/

}]);


