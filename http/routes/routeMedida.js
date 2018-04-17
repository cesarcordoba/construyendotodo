var express = require('express');
var routeMedida = express.Router();

var x = require("../controllers/controllerMedida");

routeMedida.route('/data/medida')
        .get(x.read)
        .post(x.create);

routeMedida.route('/data/medida/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeMedida;
