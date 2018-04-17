var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Descripcion = sequelize.define('descripcion', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        descripcion : Sequelize.TEXT

    })

    return Descripcion;

};

module.exports = ex;
