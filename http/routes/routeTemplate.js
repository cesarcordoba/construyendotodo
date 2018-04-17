var express = require('express');
var routeTemplate = express.Router();

var x = require("../controllers/controllerTemplate");

routeTemplate.route('/data/template')
        .get(x.read)
        .post(x.create);      

routeTemplate.route('/data/template/obtenerTodoProyectos/:items/:pagina')
        .get(x.obtenerTodoProyectos)


routeTemplate.route('/data/unirConConcepto/:idTemplate/:idConcepto')
        .post(x.unir);

routeTemplate.route('/data/template/obtenerConConcepto/:idTemplate')
        .get(x.obtenerConConcepto);

routeTemplate.route('/data/unirAConcepto/:idConcepto/:idTemplate')
	.post(x.unirAConcepto)
	.delete(x.eliminarUnionConcepto);

routeTemplate.route('/data/template/obtenerConImagenes')
	.get(x.obtenerConImagenes);


routeTemplate.route('/data/template/paginacion/:items/:pagina')
        .get(x.paginacion)

routeTemplate.route('/data/template/imagenes/:id')
        .get(x.imagenes)

routeTemplate.route('/data/template/imagenes1/:id')
        .get(x.imagenesCompleta)

routeTemplate.route('/data/template/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeTemplate.route('/data/template/buscar')
        .post(x.buscar);

module.exports = routeTemplate;
