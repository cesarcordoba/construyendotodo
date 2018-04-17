var db = require('../relations');
var testimonio = db.testimonio;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    testimonio.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    testimonio.findById(id).then(function(testimonio) {
        testimonio.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    testimonio.update(data, {
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
        testimonio.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        testimonio.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};
