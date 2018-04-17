var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Cotizacion = sequelize.define('cotizacion', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        cantidad : Sequelize.FLOAT

    })

    return Cotizacion;

};

module.exports = ex;
