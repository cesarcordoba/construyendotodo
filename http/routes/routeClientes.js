var express = require('express');
var routeClientes = express.Router();

var x = require("../controllers/controllerClientes");

routeClientes.route('/data/clientes')
        .get(x.read)
        .post(x.create);

routeClientes.route('/data/clientes/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeClientes;
