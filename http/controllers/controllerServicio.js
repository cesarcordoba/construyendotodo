var db = require('../relations');
var servicio = db.servicio;
var template = db.template;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    servicio.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    servicio.findById(id).then(function(servicio) {
        servicio.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    servicio.update(data, {
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
        servicio.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        servicio.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.albanileria = function(req, res, next) {

    var id = req.params.id;
    arra1 = []

      servicio.findById(id)
        .then(servicio => servicio.getProyecto({
            attributes : ['id', 'nombre'],
            include:[
                {
                    model: template,
                    as: 'Template',
                    attributes : ['id', 'nombre'],
                }
            ]
        }))
        .then(result => res.status(200).json(result))
};

ex.mantenimiento = function(req, res, next) {

    var id = req.params.id;

      servicio.findById(id)
        .then(servicio => servicio.getProyecto({
            attributes : ['id', 'nombre'],
            include:[
                {
                    model: template,
                    as: 'Template',
                    attributes : ['id', 'nombre'],
                }
            ]
        }))
        .then(result => res.status(200).json(result))
};

ex.diseno = function(req, res, next) {

    var id = req.params.id;

      servicio.findById(id)
        .then(servicio => servicio.getProyecto({
            attributes : ['id', 'nombre'],
            include:[
                {
                    model: template,
                    as: 'Template',
                    attributes : ['id', 'nombre'],
                }
            ]
        }))
        .then(result => res.status(200).json(result))
};
