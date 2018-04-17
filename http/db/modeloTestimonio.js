var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Testimonio = sequelize.define('testimonio', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre : Sequelize.STRING,
        correo : Sequelize.STRING,
        telefono : Sequelize.STRING,
        comentario : Sequelize.TEXT

    })

    return Testimonio;

};

module.exports = ex;
