var _ = require('lodash')
var db = require('../relations');
var {template,concepto, categoria, servicio, limite, medida, descripcion, imagenes} = db;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    template.create(data).then(function(result) {
        descripcion.create({id_template:result.id}).then(function(result){
            res.status(200).jsonp(result);
        })
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    template.findById(id).then(function(template) {
        template.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    template.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
    descripcion.update({descripcion: data.Descripcion.descripcion},{
        where: {
            id_template : id
        }
    }).then(function(result){
        console.log(result);
    })
};


ex.read = function(req, res, next) {

    var id = req.params.id;

     if (id) {
        template.findById(id,
            {
            include: [
                {
                    model: descripcion,
                    as: 'Descripcion'
                }
            ]
        }).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        template.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.unir = function (req, res, next) {

    var idtemplates = req.params.idTemplate;
    var idconcepto = req.params.idConcepto;

   template.findById(idtemplates)
    .then(template => template.setConcepto(idconcepto))
    .then(res.send.bind(res))
    .catch(next);
};

ex.obtenerConConcepto = function (req, res, next) {

    var idtemplate = req.params.idTemplate;
    template.findById(idtemplate)
        .then(template => template.getConcepto())
        .then(result => res.status(200).json(result))
};

ex.unirAConcepto = function (req, res, next) {

    var idtemplate = req.params.idTemplate;
    var idconcepto = req.params.idConcepto;

   template.findById(idtemplate)
    .then(template => template.addConcepto(idconcepto))
    .then(res.send.bind(res))
    .catch(next);
};

ex.eliminarUnionConcepto = function (req, res, next) {

    var idconcepto = req.params.idConcepto;
    var idtemplate = req.params.idTemplate;

       template.findById(idtemplate)
        .then(template => template.removeConcepto(idconcepto))
        .then(result => res.status(200).json(result))
};

ex.obtenerConImagenes = function (req, res, next) {
  

   template.findAll({
        attributes : ['id', 'nombre'],
        include:[
            {
                model: imagenes,
                as: 'Imagenes'
            }
        ]
    }).then(result => res.status(200).jsonp(result))

};


ex.paginacion = function(req, res, next) {

    var pagina = req.params.pagina;
    var items = req.params.items;

    template.findAndCountAll().then(result =>
        res.status(200).jsonp(
            new Object({
                items : _.chunk(result.rows, items)[pagina - 1],
                paginas : Math.round(result.count / items)
            })
        )
    )

};



ex.imagenes = function(req, res, next) {

    template.findById(req.params.id)
    .then(templacito => templacito.getImagenes())
    .then(response => response.map(n => n.id))
    .then(result => res.status(200).jsonp(result))

};

ex.imagenesCompleta = function(req, res, next) {

    template.findById(req.params.id)
    .then(templacito => templacito.getImagenes())
    .then(response => response.map(n => n.imagen))
    .then(result => res.status(200).jsonp(result))


};



ex.obtenerTodoProyectos = function (req, res, next) {

        
        var pagina = req.params.pagina;
        var items = req.params.items;
        template.findAndCountAll({
            attributes : ['id', 'nombre'],
            include: [
            {
                model: descripcion,
                attributes : ['id', 'descripcion'],
               
            }
        ]
        })
        .then(result => 
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

    template.findAll({
        where: {
            nombre:{
                $like: '%' + data.nombre + '%'
            }
        }
    })
    .then(response => res.status(200).jsonp(response))

};


