var express = require('express');
var routeLimite = express.Router();

var x = require("../controllers/controllerLimite");

routeLimite.route('/data/limite')
        .get(x.read)
        .post(x.create);

routeLimite.route('/data/limite/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeLimite.route('/data/limiteDeConcepto/:id')
		.get(x.obtenerDeConcepto)

routeLimite.route('/data/limiteConMedida/:id')
		.get(x.obtenerDeConceptoConMedida)

routeLimite.route('/data/crearLimite/:idConcepto')
    	.post(x.crearLimite);

routeLimite.route('/data/medidaLimite/:id')
    .get(x.medidaLimite);

module.exports = routeLimite;