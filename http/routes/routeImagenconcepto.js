var express = require('express');
var routeImagenconcepto = express.Router();

var x = require("../controllers/controllerImagenconcepto");

routeImagenconcepto.route('/data/imagenconcepto')
        .get(x.read)
        .post(x.create);

routeImagenconcepto.route('/data/imagenconcepto/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeImagenconcepto.route('/data/ImagenConConcepto/:idConcepto')
        .get(x.imagenConConcepto)


module.exports = routeImagenconcepto;
