var Model = require('../models/dataAccess'),
  Query = require('./query')

var Zona = function (conf) {
  this.conf = conf || {}
  // Inicializo el objeto
  this.model = new Model(this.conf.connection)
  this.query = new Query(this.conf)

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

Zona.prototype.get_obtenertodas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idCliente', value: req.query.idCliente, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_ZONA_SP', params, res)
}

Zona.prototype.get_obtener = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = []
  // Llamada a SP
  this.query.execute('SEL_ZONA_ALL_SP', params, res)
}

Zona.prototype.get_obtenerbycontrato = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idContrato', value: req.query.idContrato, type: self.model.types.INT },
    { name: 'idContratoProveedor', value: req.query.idContratoProveedor, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_ZONA_CONTRATO_SP', params, res)
}

Zona.prototype.get_obtenerniveles = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idCliente', value: req.query.idCliente, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_NIVEL_ZONA_SP', params, res)
}

Zona.prototype.post_agregarnivel = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idCliente', value: req.body.idCliente, type: self.model.types.INT },
    { name: 'etiqueta', value: req.body.etiqueta, type: self.model.types.STRING },
    { name: 'orden', value: req.body.orden, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('INS_NIVEL_ZONA_SP', params, res)
}

Zona.prototype.post_agregar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idNivelZona', value: req.body.idNivelZona, type: self.model.types.INT },
    { name: 'idPadre', value: req.body.idPadre, type: self.model.types.INT },
    { name: 'nombre', value: req.body.nombre, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_ZONA_SP', params, res)
}

Zona.prototype.delete_eliminarnivel = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idNivelZona', value: req.body.idNivelZona, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('DEL_NIVEL_ZONA_SP', params, res)
}

Zona.prototype.delete_eliminar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idZona', value: req.body.idNivelZona, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('DEL_ZONA_SP', params, res)
}

module.exports = Zona
