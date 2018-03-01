var Model = require('../models/dataAccess'),
  Query = require('./query')

var Kit = function (conf) {
  this.conf = conf || {}
  // Inicializo el objeto
  this.model = new Model(this.conf.connection)
  this.query = new Query(this.conf)

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

Kit.prototype.get_obtenertodos = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idUnidad', value: req.query.idUnidad, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_KIT_SP', params, res)
}

Kit.prototype.get_obtenernokit = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUnidad', value: req.query.idUnidad, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_NOPARTIDA_KIT_SP', params, res)
}

Kit.prototype.get_obtenerkits = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idProveedorCotizacion', value: req.query.idProveedorCotizacion, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_KITS_SP', params, res)
}

Kit.prototype.get_obtenerpartidas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idKit', value: req.query.idKit, type: self.model.types.INT },
    { name: 'idProveedorCotizacion', value: req.query.idProveedorCotizacion, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_KIT_PARTIDAS_SP', params, res)
}

Kit.prototype.post_agregar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
    { name: 'partida', value: req.body.partida, type: self.model.types.STRING },
    { name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING },
    { name: 'instructivo', value: req.body.instructivo, type: self.model.types.STRING },
    { name: 'json', value: req.body.json, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_KIT_SP', params, res)
}

Kit.prototype.post_agregarcosto = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idProveedorCotizacion', value: req.body.idProveedorCotizacion, type: self.model.types.INT },
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'json', value: req.body.json, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_PROVEEDOR_KIT_SP', params, res)
}

Kit.prototype.put_actualizar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idKit', value: req.body.idKit, type: self.model.types.INT },
    { name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
    { name: 'partida', value: req.body.partida, type: self.model.types.STRING },
    { name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING },
    { name: 'instructivo', value: req.body.instructivo, type: self.model.types.STRING },
    { name: 'json', value: req.body.json, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('UPD_KIT_SP', params, res)
}

module.exports = Kit
