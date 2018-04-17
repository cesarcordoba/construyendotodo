var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Proyecto = sequelize.define('proyecto', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre : Sequelize.STRING

    })

    return Proyecto;

};

module.exports = ex;
