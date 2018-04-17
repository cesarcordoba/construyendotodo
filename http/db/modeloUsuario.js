var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Usuario = sequelize.define('usuario', {
        nombre: Sequelize.STRING,
        correo: Sequelize.STRING,
        password: Sequelize.STRING,
        telefono : Sequelize.STRING
    })

    return Usuario;

};

module.exports = ex;
