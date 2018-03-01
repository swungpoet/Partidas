var Model = require('../models/dataAccess'),
  Query = require('./query')

var Cotizacion = function (conf) {
  this.conf = conf || {}
  // Inicializo el objeto
  this.model = new Model(this.conf.connection)
  this.query = new Query(this.conf)

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

Cotizacion.prototype.get_obtenercotizaciones = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idUnidad', value: req.query.idUnidad, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_SP', params, res)
}

Cotizacion.prototype.get_obtenercotizacionesbyid = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idProveedorCotizacion', value: req.query.idProveedorCotizacion, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_BYID_SP', params, res)
}

Cotizacion.prototype.get_obtenerproveedorfaltante = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idUnidad', value: req.query.idUnidad, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_PROVEEDOR_FALTANTE_SP', params, res)
}

Cotizacion.prototype.get_obtenerunidades = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_PROVEEDOR_SP', params, res)
}

Cotizacion.prototype.get_obtenerpartidas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idProveedorCotizacion', value: req.query.idProveedorCotizacion, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_PARTIDAS_SP', params, res)
}

Cotizacion.prototype.get_obtenerpartidasaprobar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idProveedorCotizacion', value: req.query.idProveedorCotizacion, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_PARTIDAS_APROBAR_SP', params, res)
}

Cotizacion.prototype.get_obtenercolumnas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idProveedorCotizacion', value: req.query.idProveedorCotizacion, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_COLUMNAS_SP', params, res)
}

Cotizacion.prototype.post_agregar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
    { name: 'json', value: req.body.json, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_COTIZACION_SP', params, res)
}

Cotizacion.prototype.post_agregarcosto = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idProveedorCotizacion', value: req.body.idProveedorCotizacion, type: self.model.types.INT },
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'json', value: req.body.json, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_PROVEEDOR_PARTIDA_SP', params, res)
}

Cotizacion.prototype.post_agregarcostoceros = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idProveedorCotizacion', value: req.body.idProveedorCotizacion, type: self.model.types.INT },
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('INS_PROVEEDOR_PARTIDA_BY_COTIZACION_SP', params, res)
}

Cotizacion.prototype.post_agregaruncosto = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idProveedorCotizacion', value: req.body.idProveedorCotizacion, type: self.model.types.INT },
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'idPartida', value: req.body.idPartida, type: self.model.types.INT },
    { name: 'costoPieza', value: req.body.costoPieza, type: self.model.types.DECIMAL },
    { name: 'costoMano', value: req.body.costoMano, type: self.model.types.DECIMAL },
    { name: 'tiempo', value: req.body.tiempo, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('INS_PROVEEDOR_UNA_PARTIDA_SP', params, res)
}

Cotizacion.prototype.put_aprobarcotizacion = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'idProveedorCotizacion', value: req.body.idProveedorCotizacion, type: self.model.types.INT },
    { name: 'respuesta', value: req.body.respuesta, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('UPD_APROBAR_COTIZACION_SP', params, res)
}

Cotizacion.prototype.put_aprobarpartida = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'idProveedorCotizacion', value: req.body.idProveedorCotizacion, type: self.model.types.INT },
    { name: 'idPartida', value: req.body.idPartida, type: self.model.types.INT },
    { name: 'respuesta', value: req.body.respuesta, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('UPD_APROBAR_PARTIDA_SP', params, res)
}

Cotizacion.prototype.put_aprobarpendientes = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'idProveedorCotizacion', value: req.body.idProveedorCotizacion, type: self.model.types.INT },
  ]
  // Llamada a SP
  this.query.execute('UPD_APROBAR_PARTIDA_PENDIENTES_SP', params, res)
}

Cotizacion.prototype.put_enviaraprobacion = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'idProveedorCotizacion', value: req.body.idProveedorCotizacion, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('UPD_COTIZACION_ENVIAR_SP', params, res)
}

module.exports = Cotizacion
