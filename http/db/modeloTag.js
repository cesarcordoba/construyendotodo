var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Tag = sequelize.define('tag', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre : Sequelize.STRING

    })

    return Tag;

};

module.exports = ex;
