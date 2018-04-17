var db = require('../relations');
var {categoria , template , concepto } = db

var ex = module.exports = {};

ex.buscador = function(req, res, next) {

    var data = req.body;

    // Promise.all(
    //
    //     categoria.findAll({
    //         attributes : ['id'],
    //         include: [
    //             {
    //                 model: concepto,
    //                 as: 'Conceptos',
    //                 attributes : ['id'],
    //                 where: {
    //                     nombre:{
    //                         $like: '%' + data.nombre + '%'
    //                     }
    //                 }
    //             }
    //         ]
    //     }),
    //
    //     template.findAll({
    //         attributes : ['id'],
    //         where: {
    //             nombre:{
    //                 $like: '%' + data.nombre + '%'
    //             }
    //         }
    //     })
    //
    // )

    template.findAll({
        attributes : ['id'],
        where: {
            nombre:{
                $like: '%' + data.nombre + '%'
            }
        }
    })

    .then(response => res.status(200).jsonp(response))

};
