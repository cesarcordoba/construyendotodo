var db = require('../relations');
var _ = require('lodash')
var proyecto = db.proyecto;
var clientes = db.clientes;
var template = db.template;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    proyecto.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    proyecto.findById(id).then(function(proyecto) {
        proyecto.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    proyecto.update(data, {
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
        proyecto.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        proyecto.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.unir = function (req, res, next) {

    var idproyecto = req.params.idProyecto;
    var idservicio = req.params.idServicio;

   proyecto.findById(idproyecto)
    .then(function(proyecto){
        return proyecto.setServicio(idservicio)
    })
    .then(res.send.bind(res))
    .catch(next);
};

ex.unirATemplate = function (req, res, next) {

    var idtemplate = req.params.idTemplate;
    var idproyecto = req.params.idProyecto;

   proyecto.findById(idproyecto)
    .then(proyecto => proyecto.addTemplate(idtemplate))
    .then(res.send.bind(res))
    .catch(next);
};

ex.obtenerConTemplate = function (req, res, next) {
   
var idproyecto = req.params.idProyecto;

   proyecto.findById(idproyecto)
    .then(proyecto => proyecto.getTemplate())
    .then(res.send.bind(res))
    .catch(next);
};


ex.eliminarUnionTemplate = function (req, res, next) {
   
    var idproyecto = req.params.idProyecto;
    var idtemplate = req.params.idTemplate;

       proyecto.findById(idproyecto)
        .then(proyecto => proyecto.removeTemplate(idtemplate))
        .then(result => res.status(200).json(result))
};


ex.obtenerConServicio = function (req, res, next) {

    var idproyecto = req.params.idProyecto;

   proyecto.findById(idproyecto)
    .then(proyecto => proyecto.getServicio())
    .then(res.send.bind(res))
    .catch(next);
};

ex.agregarcliente = function(req, res, next) {
    var cliente = req.body;

    proyecto.update({id_cliente: cliente.id_cliente}, {
        where: {
            id: cliente.id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.obtenerConCliente = function(req, res, next) {
    var idproyecto = req.params.idProyecto;

    proyecto.findAll({
        include:[
        {
            model: clientes
        }
        ], where:{
            id: idproyecto
        }
    }).then(result => res.status(200).jsonp(result))
};


ex.paginacion = function (req, res, next) {

    var pagina = req.params.pagina;
    var items = req.params.items;

   proyecto.findById(idproyecto)
    .then(proyecto => proyecto.getTemplate())
    .then(res.send.bind(res))
    .catch(next);
};

ex.obtenerTodosConTemplate = function(req, res, next) {

    var pagina = req.params.pagina;
    var items = req.params.items;

    proyecto.findAndCountAll({
        attributes : ['id', 'nombre'],
        include:[
            {
                model: template,
                as: 'Template'
            }
        ]
    }).then(result =>
        res.status(200).jsonp(
            new Object({
                items : _.chunk(result.rows, items)[pagina - 1],
                paginas : Math.round(result.count / items)
            })
        )
    )

};

ex.buscar = function(req, res, next) {

    var data = req.body;

    proyecto.findAll({
        where: {
            nombre:{
                $like: '%' + data.nombre + '%'
            }
        },
        attributes : ['id', 'nombre'],
        include:[
            {
                model: template,
                as: 'Template'
            }
        ]
    

    })
    .then(response => res.status(200).jsonp(response))
};

