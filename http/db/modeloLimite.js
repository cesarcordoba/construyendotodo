var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Limite = sequelize.define('limite', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      	precio : Sequelize.FLOAT,
      	min : Sequelize.FLOAT,
      	max : Sequelize.FLOAT
    })

    return Limite;

};

module.exports = ex;
