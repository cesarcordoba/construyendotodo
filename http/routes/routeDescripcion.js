var express = require('express');
var routeDescripcion = express.Router();

var x = require("../controllers/controllerDescripcion");

routeDescripcion.route('/data/descripcion')
        .get(x.read)
        .post(x.create);

routeDescripcion.route('/data/descripcion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeDescripcion.route('/data/descripcion/concepto/:id')
        .get(x.concepto);

module.exports = routeDescripcion;