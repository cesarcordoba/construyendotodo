app.service('Usuario', function() {

    this.obtener = function() { return axios('/data/usuario/' ) }
    this.crear = function() { return axios.post('/data/usuario/', usuario ) }

});

app.service('Buscador', function() {

    this.filtrar = function(nombre) { return axios.post('/data/buscador', nombre ) }

});

app.service('Cotizacion', function() {

    this.crear = function(cotizacion) { return axios.post('/data/cotizacion', cotizacion) }
    this.obtener = function() { return axios('/data/cotizacion/' ) }
    this.editar = function(cotizacion) { return axios.put('/data/cotizacion/' + cotizacion.id, cotizacion) }
    this.one = function(id) { return axios('/data/cotizacion/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/cotizacion/' + id) }
    this.crearCotizacion = function(cotizacion, id) { return axios.post('/data/cotizacion/crearCotizacion/' + id, cotizacion) }

});

app.service('Concepto', function() {

    this.crear = function(concepto) { return axios.post('/data/concepto', concepto) }
    this.obtener = function() { return axios('/data/concepto/' ) }
    this.cotizacion = function(id) { return axios('/data/concepto/cotizacion/' + id ) }
    this.paginacion = function(items, pagina) { return axios('/data/concepto/paginacion/' + items + '/' + pagina ) }
    this.editar = function(concepto) { return axios.put('/data/concepto/' + concepto.id, concepto) }
    this.one = function(id) { return axios('/data/concepto/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/concepto/' + id)}


});

app.service('Clientes', function() {

    this.crear = function(cliente) { return axios.post('/data/clientes', cliente) }
    this.obtener = function() { return axios('/data/clientes/' ) }
    this.editar = function(cliente) { return axios.put('/data/clientes/' + cliente.id, cliente) }
    this.one = function(id) { return axios('/data/clientes/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/clientes/' + id) }


});

app.service('Proyecto', function() {
    this.buscar = function(text) { return axios.post('/data/proyecto/buscar', text) }
    this.crear = function(proyecto) { return axios.post('/data/proyecto', proyecto) }
    this.agregarCliente = function(cliente) { return axios.put('/data/clientes', cliente) }
    this.obtenerConServicio = function(id) { return axios('/data/obtenerConServicio/' + id) }
    this.obtenerConCliente = function(idproyecto) { return axios('/data/obtenerConCliente/' + idproyecto) }
    this.obtenerConTemplate = function(id) { return axios('/data/obtenerConTemplate/' + id) }
    this.eliminarUnionTemplate = function(template, proyecto) { return axios.delete('/data/unirATemplate/'+ template + '/' + proyecto ) }
    this.unir = function(proyecto, servicio) { return axios.post('/data/unirConServicio/'+ proyecto + '/' + servicio ) }
    this.unirATemplate = function(template, proyecto) { return axios.post('/data/unirATemplate/'+ template + '/' + proyecto ) }
    this.obtener = function() { return axios('/data/proyecto/') }
    this.editar = function(proyecto) { return axios.put('/data/proyecto/' + proyecto.id, proyecto) }
    this.one = function(id) { return axios('/data/proyecto/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/proyecto/' + id) }
    this.obtenerTodosConTemplate = function(items, pagina) { return axios('/data/proyecto/obtenerTodosConTemplate/' + items + '/' + pagina) }



});

app.service('Servicio', function() {

    this.crear = function(servicio) { return axios.post('/data/servicio', servicio) }
    this.obtener = function() { return axios('/data/servicio/') }
    this.editar = function(servicio) { return axios.put('/data/servicio/' + servicio.id, servicio) }
    this.one = function(id) { return axios('/data/servicio/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/servicio/' + id) }
    this.albanileria = function(id) { return axios('/data/servicioAlbanileria/' + id) }
    this.mantenimiento = function(id) { return axios('/data/servicioMantenimiento/' + id) }
    this.diseno = function(id) { return axios('/data/servicioDiseno/' + id) }


});

app.service('Categoria', function() {

    this.crear = function(categoria) { return axios.post('/data/categoria', categoria) }
    this.buscar = function(text) { return axios.post('/data/categoria/buscar', text) }
    this.filtro = function() { return axios('/data/categoria/filtro') }
    this.obtener = function() { return axios('/data/categoria') }
    this.editar = function(categoria) { return axios.put('/data/categoria/' + categoria.id, categoria) }
    this.one = function(id) { return axios('/data/categoria/' + id) }
    this.conceptos = (id, texto) => axios.post('/data/categoria/conceptos/' + id, texto)
    this.eliminar = function(id) { return axios.delete('/data/categoria/' + id) }
    this.allConceptos = (id) => axios('/data/categoria/conceptos/' + id)


});

app.service('Medida', function() {

    this.crear = function(medida) { return axios.post('/data/medida', medida) }
    this.obtener = function() { return axios('/data/medida') }
    this.editar = function(medida) { return axios.put('/data/medida/' + medida.id, medida) }
    this.one = function(id) { return axios('/data/medida/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/medida/' + id) }

});

app.service('Template', function() {

    this.buscar = function(text) { return axios.post('/data/template/buscar', text) }

    this.obtener = function() { return axios('/data/template') }
    this.paginacion = function(items, pagina) { return axios('/data/template/paginacion/' + items + '/' + pagina) }
    this.obtenerCompuesto = function() { return axios('/data/template/obtenerTodoProyectos' ) }    
    this.imagenes = function(id) { return axios('/data/template/imagenes/' + id) }
    this.imagenesCompletas = function(id) { return axios('/data/template/imagenes1/' + id) }
    this.obtenerConImagenes = function() { return axios('/data/template/obtenerConImagenes') }
    this.obtenerConConcepto = function(id) { return axios('/data/template/obtenerConConcepto/' + id) }
    this.unir = function(template, concepto) { return axios.post('/data/unirConConcepto/'+ template + '/' + concepto ) }
    this.crear = function(template) { return axios.post('/data/template', template) }
    this.editar = function(template) { return axios.put('/data/template/' + template.id, template) }
    this.one = function(id) { return axios('/data/template/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/template/' + id) }
    this.eliminarUnionConcepto = function(concepto, template) { return axios.delete('/data/unirAConcepto/'+ concepto + '/' + template ) }
    this.unirAConcepto = function(concepto, template) { return axios.post('/data/unirAConcepto/'+ concepto + '/' + template ) }

});



app.service('Descripcion', function() {

    this.obtener = function() { return axios('/data/descripcion/' ) }
    this.crear = function(descripcion) { return axios.post('/data/descripcion', descripcion) }
    this.editar = function(descripcion) { return axios.put('/data/descripcion/' + descripcion.id, descripcion) }
    this.one = function(id) { return axios('/data/descripcion/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/descripcion/' + id) }
    this.concepto = function(id) { return axios('/data/descripcion/concepto/' + id) }

});

app.service('Imagen', function() {

    this.obtener = function() { return axios('/data/imagenes/' ) }
    this.obtenerConProyecto = function(id) { return axios('/data/ImagenConProyecto/' + id) }
    this.obtenerDeTemplate = function(id) { return axios('/data/obtenerDeTemplate/' + id) }
    this.obtenerUnaDeTemplate = function(id) { return axios('/data/obtenerUnaDeTemplate/' + id) }
    this.crear = function(imagen) { return axios.post('/data/imagenes', imagen) }
    this.editar = function(imagen) { return axios.put('/data/imagenes/' + imagen.id, imagen) }
    this.editarConTemplate = function(imagen) { return axios.put('/data/editarConTemplate/' + imagen.id_template, imagen) }
    this.one = function(id) { return axios('/data/imagenes/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/imagenes/' + id) }

});

app.service('Imagenconcepto', function() {

    this.obtener = function() { return axios('/data/imagenconcepto' ) }
    this.obtenerConConcepto = function(id) { return axios('/data/ImagenConConcepto/' + id) }
    this.crear = function(imagenconcepto) { return axios.post('/data/imagenconcepto', imagenconcepto) }
    this.editar = function(imagenconcepto) { return axios.put('/data/imagenconcepto/' + imagenconcepto.id, imagenconcepto) }
    this.one = function(id) { return axios('/data/imagenconcepto/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/imagenconcepto/' + id) }

});

app.service('Limite', function() {

    this.obtener = function() { return axios('/data/limite' ) }
    this.crear = function(limite, id) { return axios.post('/data/crearLimite/' + id, limite) }
    this.editar = function(limite) { return axios.put('/data/limite/' + limite.id, limite) }
    this.one = function(id) { return axios('/data/limite/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/limite/' + id) }
    this.limiteDeConcepto = function(id) { return axios('/data/limiteDeConcepto/' + id) }
    this.limiteConMedida = function(id) { return axios('/data/limiteConMedida/' + id) }
    this.medidaLimite = function(id) { return axios('/data/medidaLimite/'+id) }


});


app.service('Prospecto', function() {

    this.obtener = function() { return axios('/data/prospecto/') }
    this.crear = function(prospecto) { return axios.post('/data/prospecto', prospecto) }
    this.editar = function(prospecto) { return axios.put('/data/usuario/' + prospecto.id, prospecto) }
    this.one = function(id) { return axios('/data/prospecto/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/prospecto/' + id) } 
    this.cotizaciones = function(id) { return axios('/data/prospecto/cotizaciones/' + id) }



});


app.service('Tag', function() {

    this.obtener = function() { return axios('/data/tag/') }
    this.crear = function(tag) { return axios.post('/data/tag', tag) }
    this.editar = function(tag) { return axios.put('/data/tag/' + tag.id, tag) }
    this.one = function(id) { return axios('/data/tag/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/tag/' + id) }
    this.ligar = function(tag, concepto) { return axios.post('/data/union/' + tag + '/' + concepto) }
    this.desligar = function(tag, concepto) { return axios.delete('/data/union/' + tag + '/' + concepto) }
    this.obtenerConConcepto = function(concepto) { return axios('/data/obtenerConConcepto/' + concepto) }



});


app.service('Testimonio', function() {

    this.obtener = function() { return axios('/data/testimonio/') }
    this.crear = function(testimonio) { return axios.post('/data/testimonio', testimonio) }
    this.editar = function(testimonio) { return axios.put('/data/testimonio/' + testimonio.id, testimonio) }
    this.one = function(id) { return axios('/data/testimonio/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/testimonio/' + id) }


});
