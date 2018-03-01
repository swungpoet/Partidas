var Model = require('../models/dataAccess'),
    Query = require('./query')

var Contrato = function(conf) {
    this.conf = conf || {}
        // Inicializo el objeto
    this.model = new Model(this.conf.connection)
    this.query = new Query(this.conf)

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
    }
}

Contrato.prototype.get_obtenertodos = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_CONTRATO_SP', params, res)
}

Contrato.prototype.get_obtenerbyid = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idContrato', value: req.query.idContrato, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_CONTRATO_BYID_SP', params, res)
}

Contrato.prototype.get_obtenerunidadesbyid = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idContrato', value: req.query.idContrato, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_CONTRATO_UNIDADES_BYID_SP', params, res)
}

Contrato.prototype.get_obtenerproveedoresbyid = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idContrato', value: req.query.idContrato, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_CONTRATO_PROVEEDORES_BYID_SP', params, res)
}

Contrato.prototype.get_obtenerproveedores = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
            { name: 'idContrato', value: req.query.idContrato, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_CONTRATO_SP', params, res)
}

Contrato.prototype.get_obtenercolumnas = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
            { name: 'idContrato', value: req.query.idContrato, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_CONTRATO_COLUMNAS_SP', params, res)
}

Contrato.prototype.get_obtenerunidadesddl = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
            { name: 'idContrato', value: req.query.idContrato, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_CONTRATO_UNIDAD_DDL_SP', params, res)
}

Contrato.prototype.get_obtenerpartidas = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
            { name: 'idUnidad', value: req.query.idUnidad, type: self.model.types.INT },
            { name: 'idContrato', value: req.query.idContrato, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_CONTRATO_PARTIDAS_SP', params, res)
}

Contrato.prototype.get_obtenerproveedorzona = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
            { name: 'idContratoProveedor', value: req.query.idContratoProveedor, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_ZONA_SP', params, res)
}

Contrato.prototype.post_agregar = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idLicitacion', value: req.body.idLicitacion, type: self.model.types.INT },
            { name: 'numero', value: req.body.numero, type: self.model.types.STRING },
            { name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING },
            { name: 'fechaInicio', value: req.body.fechaInicio, type: self.model.types.DATE },
            { name: 'fechaFin', value: req.body.fechaFin, type: self.model.types.DATE },
            { name: 'jsonUnidades', value: req.body.jsonUnidades, type: self.model.types.STRING },
            { name: 'jsonProveedores', value: req.body.jsonProveedores, type: self.model.types.STRING },
            { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('INS_CONTRATO_SP', params, res)
}

Contrato.prototype.post_actualizar = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idContrato', value: req.body.idContrato, type: self.model.types.INT },
            { name: 'numero', value: req.body.numero, type: self.model.types.STRING },
            { name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING },
            { name: 'fechaInicio', value: req.body.fechaInicio, type: self.model.types.DATE },
            { name: 'fechaFin', value: req.body.fechaFin, type: self.model.types.DATE },
            { name: 'estatus', value: req.body.estatus, type: self.model.types.INT },
            { name: 'jsonUnidades', value: req.body.jsonUnidades, type: self.model.types.STRING },
            { name: 'jsonProveedores', value: req.body.jsonProveedores, type: self.model.types.STRING },

        ]
        // Llamada a SP
    this.query.execute('UPD_CONTRATO_SP', params, res)
}

Contrato.prototype.post_agregarproveedorzona = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
            { name: 'idContratoProveedor', value: req.body.idContratoProveedor, type: self.model.types.INT },
            { name: 'json', value: req.body.json, type: self.model.types.STRING }
        ]
        // Llamada a SP
    this.query.execute('INS_PROVEEDOR_ZONA_SP', params, res)
}

Contrato.prototype.post_agregarventa = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
            { name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
            { name: 'idContrato', value: req.body.idContrato, type: self.model.types.INT },
            { name: 'json', value: req.body.json, type: self.model.types.STRING }
        ]
        // Llamada a SP
    this.query.execute('INS_CONTRATO_PARTIDA_SP', params, res)
}

Contrato.prototype.post_agregarunaventa = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
            { name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
            { name: 'idContrato', value: req.body.idContrato, type: self.model.types.INT },
            { name: 'json', value: req.body.json, type: self.model.types.STRING }
        ]
        // Llamada a SP
    this.query.execute('INS_CONTRATO_UNA_PARTIDA_SP', params, res)
}

Contrato.prototype.get_obtenerempresaddl = function(req, res, next) {
    var self = this

    var params = []

    this.query.execute('SEL_CONTRATO_EMPRESA_DDL_SP', params, res)
}

module.exports = Contrato