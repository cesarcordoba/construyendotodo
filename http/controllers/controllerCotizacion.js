var db = require('../relations');
var cotizacion = db.cotizacion;


var ex = module.exports = {};

//crear
ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    cotizacion.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.crearCotizacion = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;
    var obj;
    console.log("*********************************")
    console.log(data)
    console.log("*********************************")


    data.forEach(n => {
        
        cotizacion.create({cantidad: n.cantidad, id_concepto: n.idConcepto, id_prospecto: id})
        .then(function(result) {
            res.status(200).jsonp(result);
        });

    } )

};

//eliminar
ex.delete = function(req, res, next) {

    var id = req.params.id;

    cotizacion.findById(id).then(function(cotizacion) {
        cotizacion.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    cotizacion.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};


ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        cotizacion.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        cotizacion.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};
