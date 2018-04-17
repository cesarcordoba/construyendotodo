var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Prospecto = sequelize.define('prospecto', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre : Sequelize.STRING,
        correo : Sequelize.STRING,
        telefono : Sequelize.STRING,
        mensaje : Sequelize.TEXT

    })

    return Prospecto;

};

module.exports = ex;
