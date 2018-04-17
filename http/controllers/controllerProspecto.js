var db = require('../relations');
var prospecto = db.prospecto;
var concepto = db.concepto;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    prospecto.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    prospecto.findById(id).then(function(prospecto) {
        prospecto.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    prospecto.update(data, {
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
        prospecto.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        prospecto.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.cotizaciones = function(req, res, next) {

    var id = req.params.id;

    prospecto.findById(id)
        .then(prospecto => prospecto.getCotizacion())
        .then(result => res.status(200).json(result))
};
