var db = require('../relations');
var imagenes = db.imagenes;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    imagenes.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    imagenes.findById(id).then(function(imagenes) {
        imagenes.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    imagenes.update(data, {
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
        imagenes.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        imagenes.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.imagenConProyecto = function(req, res, next) {

    var id = req.params.idProyecto;

    imagenes.findAll({
        where: { 
            id_proyecto : id}
        }).then(function(result) {
            res.status(200).jsonp(result);
        });

};

ex.obtenerDeTemplate = function(req, res, next) {

    var id = req.params.idTemplate;

    imagenes.findAll({
        where: 
        { 
            id_template : id
        },attributes: ['id', 'imagen', 'id_template']
        }).then(function(result) {
            res.status(200).jsonp(result);
        });

};

ex.obtenerUnaDeTemplate = function(req, res, next) {

    var id = req.params.idTemplate;

    imagenes.findOne({
        where: 
        { 
            id_template : id
        }
        }).then(function(result) {
            res.status(200).jsonp(result);
        });

};

ex.editarConTemplate = function(req, res, next) {

    var id = req.params.idTemplate;
    var data = req.body;


    imagenes.update(data,{
        where: {
            id_template : id
        }
    })
    .then(result => res.status(200).jsonp(result))

};