var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Clientes = sequelize.define('clientes', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre : Sequelize.STRING

    })

    return Clientes;

};

module.exports = ex;
