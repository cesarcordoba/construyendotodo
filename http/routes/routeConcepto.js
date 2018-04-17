var express = require('express');
var routeConcepto = express.Router();

var x = require("../controllers/controllerConcepto");

routeConcepto.route('/data/concepto')
        .get(x.read)
        .post(x.create);

routeConcepto.route('/data/concepto/paginacion/:Items/:Pagina')
        .get(x.paginacion)

routeConcepto.route('/data/concepto/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);
        
routeConcepto.route('/data/concepto/cotizacion/:id')
        .get(x.cotizacion)
       
module.exports = routeConcepto;