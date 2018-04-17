var db = require('../relations');
var imagenconcepto = db.imagenconcepto;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    imagenconcepto.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    imagenconcepto.findById(id).then(function(imagenconcepto) {
        imagenconcepto.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    imagenconcepto.update(data, {
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
        imagenconcepto.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        imagenconcepto.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.imagenConConcepto = function(req, res, next) {

    var id = req.params.idConcepto;

    imagenconcepto.findAll({
        where: { 
            id_concepto : id}
        }).then(function(result) {
            res.status(200).jsonp(result);
        });

};



