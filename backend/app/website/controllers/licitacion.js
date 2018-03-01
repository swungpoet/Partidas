var Model = require('../models/dataAccess'),
    Query = require('./query')

var Licitacion = function(conf) {
    this.conf = conf || {}
        // Inicializo el objeto
    this.model = new Model(this.conf.connection)
    this.query = new Query(this.conf)

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
    }
}

Licitacion.prototype.get_obtenertodas = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_LICITACION_SP', params, res)
}

Licitacion.prototype.get_obtenertodasddl = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_LICITACION_DDL_SP', params, res)
}

Licitacion.prototype.post_agregar = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idCliente', value: req.body.idCliente, type: self.model.types.INT },
            { name: 'idClienteFinal', value: req.body.idClienteFinal, type: self.model.types.INT },
            { name: 'idEmpresa', value: req.body.idEmpresa, type: self.model.types.INT },
            { name: 'folio', value: req.body.folio, type: self.model.types.STRING },
            { name: 'nombre', value: req.body.nombre, type: self.model.types.STRING },
            { name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING },
            { name: 'fechaInicio', value: req.body.fechaInicio, type: self.model.types.DATE }
        ]
        // Llamada a SP
    this.query.execute('INS_LICITACION_SP', params, res)
}

Licitacion.prototype.put_actualizar = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idLicitacion', value: req.body.idLicitacion, type: self.model.types.INT },
            { name: 'idCliente', value: req.body.idCliente, type: self.model.types.INT },
            { name: 'idClienteFinal', value: req.body.idClienteFinal, type: self.model.types.INT },
            { name: 'idEmpresa', value: req.body.idEmpresa, type: self.model.types.INT },
            { name: 'folio', value: req.body.folio, type: self.model.types.STRING },
            { name: 'nombre', value: req.body.nombre, type: self.model.types.STRING },
            { name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING },
            { name: 'fechaInicio', value: req.body.fechaInicio, type: self.model.types.DATE }
        ]
        // Llamada a SP
    this.query.execute('UPD_LICITACION_SP', params, res)
}

Licitacion.prototype.delete_eliminar = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idLicitacion', value: req.body.idLicitacion, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('DEL_LICITACION_SP', params, res)
}

module.exports = Licitacion