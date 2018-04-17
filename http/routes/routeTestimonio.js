var express = require('express');
var routeTestimonio = express.Router();

var x = require("../controllers/controllerTestimonio");

routeTestimonio.route('/data/area')
        .get(x.read)
        .post(x.create);

routeTestimonio.route('/data/area/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeTestimonio;