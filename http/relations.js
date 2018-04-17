
//*-*-*-CONEXION CON SEQUELIZE & MYSQL-*-*-*-*-*-*-*
var conector = require('./connection');

//- Modelos

var usuario = require('./db/modeloUsuario')(conector);
var categoria = require('./db/modeloCategoria')(conector);
var concepto = require('./db/modeloConcepto')(conector);
var descripcion = require('./db/modeloDescripcion')(conector);
var imagenes = require('./db/modeloImagenes')(conector);
var imagenconcepto = require('./db/modeloImagenconcepto')(conector);
var limite = require('./db/modeloLimite')(conector);
var prospecto = require('./db/modeloProspecto')(conector);
var proyecto = require('./db/modeloProyecto')(conector);
var servicio = require('./db/modeloServicio')(conector);
var tag = require('./db/modeloTag')(conector);
var testimonio = require('./db/modeloTestimonio')(conector);
var template = require('./db/modeloTemplate')(conector);
var medida = require('./db/modeloMedida')(conector);
var clientes = require('./db/modeloClientes')(conector); //NUEVO
var cotizacion = require('./db/modeloCotizacion')(conector); //+ NUEVO



//- Relations

//1//limite
//2//concepto
//3//template
//4//imagenconcepto
//5//descripcion
//6//proyecto
//7//servicio
//8//imagen
//9//testimonio
//10//prospecto
//11//usuario
//12//categoria
//13//tag
//-14-//Medida NUEVO


limite.belongsTo(concepto, {foreignKey: 'id_concepto', as: 'Limite'}); //1 Limite - 2 Concepto [limite = id_concepto]
concepto.hasMany(limite, {foreignKey: 'id_concepto', as: 'Limite'});

//imagenes.belongsTo(clientes, {foreignKey: 'id_cliente'});
//clientes.hasMany(imagenes, {foreignKey: 'id_cliente'});

imagenes.belongsTo(template, {foreignKey: 'id_template', as: 'Imagenes'});
template.hasMany(imagenes, {foreignKey: 'id_template', as: 'Imagenes'});

concepto.belongsTo(categoria, {as: 'Categoria', foreignKey: 'id_categoria'});  //2 Concepto - 12 Categoria [concepto = id_categoria]
categoria.hasMany(concepto, {as: 'Conceptos', foreignKey: 'id_categoria'});

categoria.belongsTo(servicio,{foreignKey:'id_servicio', as: 'Servicio'}); //7 Servicio - 12 Categoria [categoria = id_servicio]
servicio.hasOne(categoria,{foreignKey:'id_servicio', as: 'Servicio'});

//imagenes.belongsTo(proyecto,{foreignKey:'id_proyecto'}); //8 Imagen - 6 Proyecto 	[imagen = id_proyecto]
//proyecto.hasOne(imagenes,{foreignKey:'id_proyecto'});

testimonio.belongsTo(proyecto,{foreignKey:'id_proyecto'}); //9 Testimonio - 6 Proyecto [testimonio = id_proyecto]
proyecto.hasOne(testimonio,{foreignKey:'id_proyecto'});

prospecto.belongsTo(proyecto,{foreignKey:'id_proyecto'}); //10 Prospecto - 6 Proyecto 	 [prospecto = id_proyecto]
proyecto.hasOne(prospecto,{foreignKey:'id_proyecto'});

proyecto.belongsTo(clientes,{foreignKey:'id_cliente'});
clientes.hasOne(proyecto,{foreignKey:'id_cliente'});

descripcion.belongsTo(concepto, {foreignKey:'id_concepto'});//5 Descripcion - 2 Concepto [descripcion = id_concepto]
concepto.hasOne(descripcion, {foreignKey:'id_concepto'});

descripcion.belongsTo(template, {foreignKey:'id_template', as: 'Descripcion'});//5 Descripcion - 2 Concepto [descripcion = id_concepto]
template.hasOne(descripcion, {foreignKey:'id_template', as: 'Descripcion'});

imagenconcepto.belongsTo(concepto, {foreignKey:'id_concepto', as: 'ImagenesConcepto'}); //4 imagenconcepto - 2concepto [imagenconcepto = id_concepto]
concepto.hasMany(imagenconcepto, {foreignKey: 'id_concepto', as: 'ImagenesConcepto'});

prospecto.belongsTo(limite, {foreignKey: 'id_limite'}); // 10 prospecto - 1 limites [prospecto = id_limite]
limite.hasMany(prospecto, {foreignKey: 'id_limite'});

template.belongsToMany(concepto, { as: 'Concepto', through:'template_concepto', foreignKey:'id_template'}); //3 Template -2 Concepto
concepto.belongsToMany(template, { as: 'Template', through:'template_concepto', foreignKey:'id_concepto'});

tag.belongsToMany(concepto, { as: 'Conceptos', through:'tag_concepto', foreignKey:'id_tag'}); //13 Tag - 2 Concepto
concepto.belongsToMany(tag, { as: 'Tag', through:'tag_concepto', foreignKey:'id_concepto'});

servicio.belongsToMany(proyecto, { as: 'Proyecto', through:'servicio_proyecto', foreignKey:'id_servicio'}); //7Servicio - 6 Proyecto
proyecto.belongsToMany(servicio, { as: 'Servicio', through:'servicio_proyecto', foreignKey:'id_proyecto'});

template.belongsToMany(proyecto, { as: 'Proyecto', through:'template-proyecto', foreignKey:'id_template'});
proyecto.belongsToMany(template, { as: 'Template', through:'template-proyecto', foreignKey:'id_proyecto'});

//NUEVO
limite.belongsTo(medida, {foreignKey: 'id_medida', as: 'Medida'}); //1 Limite - 14 Medida [limite = id_medida]
medida.hasMany(limite, {foreignKey: 'id_medida', as: 'Medida'});

cotizacion.belongsTo(concepto, {foreignKey: 'id_concepto', as: 'Cotizador'})
concepto.hasMany(cotizacion, {foreignKey: 'id_concepto', as: 'Cotizador'})

cotizacion.belongsTo(prospecto, {foreignKey: 'id_prospecto', as: 'Prospecto'})
prospecto.hasMany(cotizacion, {foreignKey: 'id_prospecto', as: 'Cotizacion'})


module.exports.usuario = usuario;
module.exports.categoria = categoria;
module.exports.clientes = clientes;
module.exports.concepto = concepto;
module.exports.descripcion = descripcion;
module.exports.imagenes = imagenes;
module.exports.imagenconcepto = imagenconcepto;
module.exports.limite = limite;
module.exports.prospecto = prospecto;
module.exports.proyecto = proyecto;
module.exports.servicio = servicio;
module.exports.tag = tag;
module.exports.testimonio = testimonio;
module.exports.template = template;
module.exports.medida = medida;
module.exports.cotizacion = cotizacion;

