var express = require('express');
var routeServicio = express.Router();

var x = require("../controllers/controllerServicio");

routeServicio.route('/data/servicio')
        .get(x.read)
        .post(x.create);

routeServicio.route('/data/servicio/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeServicio.route('/data/servicioAlbanileria/:id')
        .get(x.albanileria);

routeServicio.route('/data/servicioMantenimiento/:id')
        .get(x.mantenimiento);

routeServicio.route('/data/servicioDiseno/:id')
        .get(x.diseno);


module.exports = routeServicio;