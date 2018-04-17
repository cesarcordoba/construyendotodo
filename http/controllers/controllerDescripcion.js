var db = require('../relations');
var descripcion = db.descripcion;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    descripcion.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};


ex.concepto = function(req, res, next) {

    descripcion.findOne({where : {  id_concepto :  req.params.id }}).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    descripcion.findById(id).then(function(descripcion) {
        descripcion.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {

    console.log(req.params.id)

    var id = req.params.id;
    var data = req.body;

    descripcion.update(data, {
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
        descripcion.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        descripcion.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};
