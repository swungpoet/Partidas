var Model = require('../models/dataAccess'),
  Query = require('./query')

var Partida = function (conf) {
  this.conf = conf || {}
  this.model = new Model(this.conf.connection)
  this.query = new Query(this.conf)

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

Partida.prototype.get_obtenertodas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idUnidad', value: req.query.idUnidad, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PARTIDA_SP', params, res)
}

Partida.prototype.get_obtenerpartidasddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idUnidad', value: req.query.idUnidad, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PARTIDA_DDL_SP', params, res)
}

Partida.prototype.get_obtenerespecialidadddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_ESPECIALIDAD_DDL_SP', params, res)
}

Partida.prototype.get_obtenertipoddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = []
  // Llamada a SP
  this.query.execute('SEL_TIPO_PARTIDA_DDL_SP', params, res)
}

Partida.prototype.get_obtenerclasificacionddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_CLASIFICACION_DDL_SP', params, res)
}

Partida.prototype.get_obtenersubclasificacionddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_SUBCLASIFICACION_DDL_SP', params, res)
}

Partida.prototype.get_obtenernopartida = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUnidad', value: req.query.idUnidad, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_NOPARTIDA_SP', params, res)
}

Partida.prototype.post_agregar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
    { name: 'idTipoPartida', value: req.body.idTipoPartida, type: self.model.types.INT },
    { name: 'idEspecialidad', value: req.body.idEspecialidad, type: self.model.types.INT },
    { name: 'idPartidaClasificacion', value: req.body.idPartidaClasificacion, type: self.model.types.INT },
    { name: 'idPartidaSubClasificacion', value: req.body.idPartidaSubClasificacion, type: self.model.types.INT },
    { name: 'partida', value: req.body.partida, type: self.model.types.STRING },
    { name: 'noParte', value: req.body.noParte, type: self.model.types.STRING },
    { name: 'marca', value: req.body.marca, type: self.model.types.STRING },
    { name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING },
    { name: 'foto', value: req.body.foto, type: self.model.types.STRING },
    { name: 'instructivo', value: req.body.instructivo, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_PARTIDA_SP', params, res)
}

Partida.prototype.put_actualizar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idPartida', value: req.body.idPartida, type: self.model.types.INT },
    { name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
    { name: 'idTipoPartida', value: req.body.idTipoPartida, type: self.model.types.INT },
    { name: 'idEspecialidad', value: req.body.idEspecialidad, type: self.model.types.INT },
    { name: 'idPartidaClasificacion', value: req.body.idPartidaClasificacion, type: self.model.types.INT },
    { name: 'idPartidaSubClasificacion', value: req.body.idPartidaSubClasificacion, type: self.model.types.INT },
    { name: 'partida', value: req.body.partida, type: self.model.types.STRING },
    { name: 'noParte', value: req.body.noParte, type: self.model.types.STRING },
    { name: 'marca', value: req.body.marca, type: self.model.types.STRING },
    { name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING },
    { name: 'foto', value: req.body.foto, type: self.model.types.STRING },
    { name: 'instructivo', value: req.body.instructivo, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('UPD_PARTIDA_SP', params, res)
}

Partida.prototype.delete_eliminar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idPartida', value: req.body.idPartida, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('DEL_PARTIDA_SP', params, res)
}

module.exports = Partida
