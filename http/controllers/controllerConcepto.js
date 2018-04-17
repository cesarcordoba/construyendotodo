var db = require('../relations');
var { concepto , descripcion, limite, imagenconcepto, categoria, servicio, limite, medida} = db;
var _ = require('lodash')


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    concepto.create(data).then(function(result) {
        descripcion.create({id_concepto:result.id}).then(function(result){
            res.status(200).jsonp(result);
        })
        res.status(200).jsonp(result);
    });

};


ex.delete = function(req, res, next) {

    var id = req.params.id;

    concepto.findById(id).then(function(concepto) {
        concepto.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    concepto.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });

    descripcion.update({descripcion: data.descripcion.descripcion},{
        where: {
            id_concepto : id
        }
    }).then(function(result){
        console.log(result);
    })
};


ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        concepto.findById(id,{
            include: [
                {
                    model: descripcion
                },
                {
                    model: limite,
                    as: 'Limite',
                    include: [
                    {
                        model: medida,
                        as: 'Medida',
                        attributes: ['id', 'nombre']
                    }
                    ],
                    attributes: ['id']
                }
            ],

        }).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        concepto.findAll({
            include: {
                model: imagenconcepto,
                as: 'ImagenesConcepto',
                attributes: ['id', 'imagen']
            }
        }).then(function(result) {
            res.status(200).jsonp(result);
        });
    }

};

ex.paginacion = function(req, res, next) {

    var items = req.params.Items;
    var pagina = req.params.Pagina;

    concepto.findAndCountAll({
        order:['nombre']}).then(result=> {
            const response = new Object({pagina:Math.round(result.count/items),
                        items: _.chunk(result.rows, items)[pagina-1]});
            res.status(200).jsonp(response);
        })

};

ex.cotizacion = function(req, res, next) {
    var id = req.params.id;

    concepto.findById(id,{
        include: [
            {
                model: imagenconcepto,
                as: 'ImagenesConcepto',
                attributes: ['imagen']
            },
            {
                model: descripcion,
                attributes: ['id', 'descripcion']
            },
            {
                model: categoria,
                as: 'Categoria',
                include: [
                   {
                        model: servicio,
                        as: 'Servicio',
                        attributes: ['id', 'nombre']
                    }
                ],
                attributes: ['id', 'nombre', 'id_servicio']
            }
        ],attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
    }).then(result =>  res.status(200).jsonp(result))

};