var Model = require('../models/dataAccess'),
  Query = require('./query')

var Usuario = function (conf) {
  this.conf = conf || {}
  // Inicializo el objeto
  this.model = new Model(this.conf.connection)
  this.query = new Query(this.conf)

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

Usuario.prototype.get_iniciarsesion = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'usuario', value: req.query.usuario, type: self.model.types.STRING },
   { name: 'password', value: req.query.password, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('SEL_USUARIO_LOGIN_SP', params, res)
}

Usuario.prototype.get_iniciarsesionASE = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'usuario', value: req.query.usuario, type: self.model.types.STRING },
   { name: 'password', value: req.query.password, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('SEL_USUARIO_LOGIN_SP_ASE', params, res)
}


module.exports = Usuario
