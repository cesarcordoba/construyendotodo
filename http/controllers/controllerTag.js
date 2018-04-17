var db = require('../relations');
var tag = db.tag;
var concepto = db.concepto;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    tag.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    tag.findById(id).then(function(tag) {
        tag.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    tag.update(data, {
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
        tag.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        tag.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};


ex.ligar = function(req, res, next) {

    var idtag = req.params.idTag;
    var idconcepto = req.params.idConcepto;

    tag.findById(idtag)
    .then(tag => tag.addConceptos(idconcepto))
    .then(res.send.bind(res))
    .catch(next);
};


ex.desligar = function(req, res, next) {

    var idtag = req.params.idTag;
    var idconcepto = req.params.idConcepto;

    tag.findById(idtag)
        .then(tag => tag.removeConceptos(idconcepto))
        .then(result => res.status(200).json(result))
    
};

ex.obtenerConConcepto = function(req, res, next) {

    var idconcepto = req.params.idConcepto;

    concepto.findById(idconcepto)
        .then(concepto => concepto.getTag())
        .then(result => res.status(200).json(result))
    
};



