var Model = require('../models/dataAccess'),
  Query = require('./query')

var Cliente = function (conf) {
  this.conf = conf || {}
  // Inicializo el objeto
  this.model = new Model(this.conf.connection)
  this.query = new Query(this.conf)

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

Cliente.prototype.get_obtenertodos = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_CLIENTE_SP', params, res)
}

Cliente.prototype.get_obtenertodosddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_CLIENTE_DDL_SP', params, res)
}

Cliente.prototype.post_agregar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'nombreComercial', value: req.body.nombreComercial, type: self.model.types.STRING },
    { name: 'razonSocial', value: req.body.razonSocial, type: self.model.types.STRING },
    { name: 'rfc', value: req.body.rfc, type: self.model.types.STRING },
    { name: 'direccion', value: req.body.direccion, type: self.model.types.STRING },
    { name: 'telefono', value: req.body.telefono, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_CLIENTE_SP', params, res)
}

Cliente.prototype.put_actualizar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idCliente', value: req.body.idCliente, type: self.model.types.INT },
    { name: 'nombreComercial', value: req.body.nombreComercial, type: self.model.types.STRING },
    { name: 'razonSocial', value: req.body.razonSocial, type: self.model.types.STRING },
    { name: 'rfc', value: req.body.rfc, type: self.model.types.STRING },
    { name: 'direccion', value: req.body.direccion, type: self.model.types.STRING },
    { name: 'telefono', value: req.body.telefono, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('UPD_CLIENTE_SP', params, res)
}

Cliente.prototype.delete_eliminar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idCliente', value: req.body.idCliente, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('DEL_CLIENTE_SP', params, res)
}

module.exports = Cliente
