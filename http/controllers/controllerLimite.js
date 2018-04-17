var db = require('../relations');
var {limite, concepto, medida} = db;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    limite.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    limite.findById(id).then(function(limite) {
        limite.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    limite.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};


ex.obtenerDeConcepto = function(req, res, next) {

    var id = req.params.id;

    var buscar = {
        where:{
            id_concepto : id
        }
    }
    limite.findAll(buscar).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.obtenerDeConceptoConMedida = function(req, res, next) {

    var id = req.params.id;

    var buscar = {
        where:{
            id_concepto : id
        }
    }
    limite.findAll(buscar,{
            include: [
                {
                    model: medida,
                    as: 'Medida',
                    attributes: ['id', 'nombre']
                }
            ]
    }).then(function(result) {
        res.status(200).jsonp(result);
    });

};


ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        limite.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        limite.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.conceptoLimite = function(req, res, next) {

    var id = req.params.id;
    var data = req.body;
    data.id_concepto = id;

    limite.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.medidaLimite = function(req, res, next) {

    var id = req.params.id;

           
        limite.findAll({
            where: {
                id_medida : id
        }
        
    }).then(function(result) {
            res.status(200).jsonp(result);
        });
    

};

ex.crearLimite = function(req, res, next) {
    var id = req.params.idConcepto;
    var data = req.body;

    limites = {
            precio: data.precio,
            max: data.max,
            min: data.min, 
            id_medida: data.id_medida,
            id_concepto: id
    }   
    limite.create(limites).then(function(result) {
        res.status(200).jsonp(result);
    });

};