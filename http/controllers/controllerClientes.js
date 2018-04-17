var db = require('../relations');
var clientes = db.clientes;


var ex = module.exports = {};

//crear
ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    clientes.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

//eliminar
ex.delete = function(req, res, next) {

    var id = req.params.id;

    clientes.findById(id).then(function(clientes) {
        clientes.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

//actualizar
ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    clientes.update({nombre: data.nombre, id_servicio: data.id_servicio}, {
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
        clientes.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        clientes.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};
