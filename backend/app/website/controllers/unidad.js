var Model = require('../models/dataAccess'),
  Query = require('./query')

var Marca = function (conf) {
  this.conf = conf || {}

  this.model = new Model(this.conf.connection)
  this.query = new Query(this.conf)

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

// ////////// GET
Marca.prototype.get_obtenermarcaddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idusuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_MARCA_DDL_SP', params, res)
}

Marca.prototype.get_obtenermarca = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idusuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_MARCA_SP', params, res)
}

Marca.prototype.get_obtenersubmarca = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idusuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_SUBMARCA_SP', params, res)
}

Marca.prototype.get_obtenersubmarcaddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idusuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_SUBMARCA_DDL_SP', params, res)
}

Marca.prototype.get_obtenerunidad = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idusuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_UNIDAD_SP', params, res)
}

Marca.prototype.get_obtenerunidadASE = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idusuario, type: self.model.types.INT },
    { name: 'idOperacion', value: req.query.idOperacion, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_UNIDAD_SP_ASE', params, res)
}

Marca.prototype.get_obtenerunidadbyid = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUnidad', value: req.query.idUnidad, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_UNIDAD_BYID_SP', params, res)
}

Marca.prototype.get_obtenerunidadddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_UNIDAD_DDL_SP', params, res)
}

Marca.prototype.get_obtenerunidadbyoperacionddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idOperacion', value: req.query.idOperacion, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_UNIDAD_BY_OPERACION_DDL_SP', params, res)
}


Marca.prototype.get_obtenertipocombustibleddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_TIPO_COMBUSTIBLE_DDL_SP', params, res)
}

Marca.prototype.get_obtenercilindrosddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idusuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_CILINDROS_DDL_SP', params, res)
}

Marca.prototype.get_obtenertiposddl = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_TIPO_UNIDAD_DDL_SP', params, res)
}

Marca.prototype.get_obtenersucursalASE = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = []
  // Llamada a SP
  this.query.execute('SEL_SUCURSAL_SP_ASE', params, res)
}

Marca.prototype.get_obteneruoASE = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    {name: 'idZona', value: req.query.idZona, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_UNIDAD_OPERATIVA_SP_ASE', params, res)
}

// ///////////POST
Marca.prototype.post_agregarmarca = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'marca', value: req.body.marca, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_MARCA_SP', params, res)
}

Marca.prototype.post_agregarsubmarca = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idMarca', value: req.body.idMarca, type: self.model.types.INT },
    { name: 'subMarca', value: req.body.subMarca, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_SUBMARCA_SP', params, res)
}

Marca.prototype.post_agregarunidad = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idTipoCombustible', value: req.body.idTipoCombustible, type: self.model.types.INT },
    { name: 'idTipoUnidad', value: req.body.idTipoUnidad, type: self.model.types.INT },
    { name: 'idSubMarca', value: req.body.idSubMarca, type: self.model.types.INT },
    { name: 'idCilindros', value: req.body.idCilindros, type: self.model.types.INT },
    { name: 'foto', value: req.body.foto, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_UNIDAD_SP', params, res)
}

// ///////////POST
Marca.prototype.post_agregarunidadASE = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'idTipoUnidad', value: req.body.idTipoUnidad, type: self.model.types.INT },
    { name: 'idSucursal', value: req.body.idSucursal, type: self.model.types.INT },
    { name: 'idUnidadOperativa', value: req.body.idUnidadOperativa, type: self.model.types.INT },
    { name: 'numeroEconomico', value: req.body.numeroEconomico, type: self.model.types.STRING },
    { name: 'vin', value: req.body.vin, type: self.model.types.STRING },
    { name: 'placas', value: req.body.placas, type: self.model.types.STRING },
    { name: 'modelo', value: req.body.modelo, type: self.model.types.STRING },
    { name: 'frente', value: req.body.frente, type: self.model.types.STRING },
    { name: 'derecho', value: req.body.derecho, type: self.model.types.STRING },
    { name: 'izquierdo', value: req.body.izquierdo, type: self.model.types.STRING },
    { name: 'atras', value: req.body.atras, type: self.model.types.STRING },
    { name: 'tarjeta', value: req.body.tarjeta, type: self.model.types.STRING },
    { name: 'repuve', value: req.body.repuve, type: self.model.types.STRING },
    { name: 'placavin', value: req.body.placavin, type: self.model.types.STRING },
    { name: 'verificacionAmbiental', value: req.body.verificacionAmbiental, type: self.model.types.STRING },
    { name: 'fechaVencimientoVerificacionAmbiental', value: req.body.fechaVencimientoVerificacionAmbiental, type: self.model.types.DATE },
    { name: 'verificacionFisicoMecanica', value: req.body.verificacionFisicoMecanica, type: self.model.types.STRING },
    { name: 'fechaVencimientoVerificacionFisicoMecanica', value: req.body.fechaVencimientoVerificacionFisicoMecanica, type: self.model.types.DATE },
    { name: 'refrendo', value: req.body.refrendo, type: self.model.types.STRING },
    { name: 'fechaVencimientoRefrendo', value: req.body.fechaVencimientoRefrendo, type: self.model.types.DATE },
    { name: 'tenencia', value: req.body.tenencia, type: self.model.types.STRING },
    { name: 'fechaVencimientoTenencia', value: req.body.fechaVencimientoTenencia, type: self.model.types.DATE },
    { name: 'autorizacion', value: req.body.autorizacion, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('INS_UNIDAD_SP_ASE', params, res)
}

// //////////PUT
Marca.prototype.put_actualizarunidad = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
    { name: 'idTipoCombustible', value: req.body.idTipoCombustible, type: self.model.types.INT },
    { name: 'idTipoUnidad', value: req.body.idTipoUnidad, type: self.model.types.INT },
    { name: 'idSubMarca', value: req.body.idSubMarca, type: self.model.types.INT },
    { name: 'idCilindros', value: req.body.idCilindros, type: self.model.types.INT },
    { name: 'foto', value: req.body.foto, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('UPD_UNIDAD_SP', params, res)
}

// //////////PUT
Marca.prototype.put_quitarverificacion = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'numeroEconomico', value: req.body.numeroEconomico, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('UPD_UNIDAD_VERIFICA_SP_ASE', params, res)
}

// ///////////DELETE
Marca.prototype.delete_eliminarmarca = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idMarca', value: req.body.idMarca, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('DEL_MARCA_SP', params, res)
}

Marca.prototype.delete_eliminarsubmarca = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idSubMarca', value: req.body.idSubMarca, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('DEL_SUBMARCA_SP', params, res)
}

Marca.prototype.delete_eliminarunidad = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('DEL_UNIDAD_SP', params, res)
}

module.exports = Marca
