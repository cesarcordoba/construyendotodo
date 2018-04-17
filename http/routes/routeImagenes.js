var express = require('express');
var routeImagenes = express.Router();

var x = require("../controllers/controllerImagenes");

routeImagenes.route('/data/imagenes')
        .get(x.read)
        .post(x.create);

routeImagenes.route('/data/imagenes/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeImagenes.route('/data/ImagenConProyecto/:idProyecto')
        .get(x.imagenConProyecto)

routeImagenes.route('/data/obtenerDeTemplate/:idTemplate')
		.get(x.obtenerDeTemplate)

routeImagenes.route('/data/obtenerUnaDeTemplate/:idTemplate')
		.get(x.obtenerUnaDeTemplate)

routeImagenes.route('/data/editarConTemplate/:idTemplate')
		.put(x.editarConTemplate)


module.exports = routeImagenes;
