var express = require('express');
var route = express.Router();

var x = require("../controllers/controllerBuscador");

route.route('/data/buscador')
        .post(x.buscador)

module.exports = route;
