var db = require('../relations');
var medida = db.medida;


var ex = module.exports = {};

//crear
ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    medida.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

//eliminar
ex.delete = function(req, res, next) {

    var id = req.params.id;

    medida.findById(id).then(function(medida) {
        medida.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

//actualizar
ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    medida.update(data, {
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
        medida.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        medida.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};
