var Model = require('../models/dataAccess'),
    Query = require('./query')

var Proveedor = function(conf) {
    this.conf = conf || {}
        // Inicializo el objeto
    this.model = new Model(this.conf.connection)
    this.query = new Query(this.conf)

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
    }
}

Proveedor.prototype.get_obtenertodos = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_SP', params, res)
}

Proveedor.prototype.get_obtenertodosddl = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_DLL_SP', params, res)
}

Proveedor.prototype.get_obtenercotizacionbyid = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedorCotizacion', value: req.query.idProveedorCotizacion, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_COTIZACION_BYID_SP', params, res)
}

Proveedor.prototype.get_obtenerbyid = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_BYID_SP', params, res)
}



Proveedor.prototype.get_obtenerespecialidadesbyid = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_ESPECIALIDADES_BYID_SP', params, res)
}

Proveedor.prototype.get_obtenerdatosfiscalesbyid = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_DATOSFISCALES_BYID_SP', params, res)
}

Proveedor.prototype.get_obtenertiposcombustiblebyid = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_TIPOSCOMUBSTIBLE_BYID_SP', params, res)
}

Proveedor.prototype.get_obtenermarcadores = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_MARCADOR_SP', params, res)
}

Proveedor.prototype.get_obtenerespecialidad = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_ESPECIALIDAD_SP', params, res)
}

Proveedor.prototype.get_obtenerespecialidadselected = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_ESPECIALIDAD_SELECTED_SP', params, res)
}

Proveedor.prototype.get_obtenercategoria = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_CATEGORIA_SP', params, res)
}

Proveedor.prototype.get_obtenerclasificacion = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idCategoria', value: req.query.idCategoria, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_CLASIFICACION_DDL_SP', params, res)
}

Proveedor.prototype.get_obtenersubclasificacion = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idCategoria', value: req.query.idCategoria, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_SUBCLASIFICACION_DDL_SP', params, res)
}

Proveedor.prototype.get_obtenertipounidad = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_TIPO_UNIDAD_SP', params, res)
}

Proveedor.prototype.get_obtenertipounidadselected = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_TIPO_UNIDAD_SELECTED_SP', params, res)
}

Proveedor.prototype.get_obtenerdocumentosencabezado = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedorEncabezado', value: req.query.idProveedorEncabezado, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_PROVEEDOR_ENCABEZADO_DOCUMENTO_SP', params, res)
}

Proveedor.prototype.get_obtenertodosdocumentosencabezado = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
        ]
        // Llamada a SP
    this.query.execute('SEL_DOCUMENTO_ENCABEZADO_SP', params, res)
}

Proveedor.prototype.get_obtenerdocumentosencabezadoddl = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('SEL_DOCUMENTOS_ENCABEZADO_DDL_SP', params, res)
}

Proveedor.prototype.post_agregar = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'nombreComercial', value: req.body.nombreComercial, type: self.model.types.STRING },
            { name: 'razonSocial', value: req.body.razonSocial, type: self.model.types.STRING },
            { name: 'RFC', value: req.body.RFC, type: self.model.types.STRING },
            { name: 'contacto', value: req.body.contacto, type: self.model.types.STRING },
            { name: 'telefono', value: req.body.telefono, type: self.model.types.STRING },
            { name: 'mail', value: req.body.mail, type: self.model.types.STRING },
            { name: 'fechaInicio', value: req.body.fechaInicio, type: self.model.types.DATE },
            { name: 'idCategoria', value: req.body.idCategoria, type: self.model.types.INT },
            { name: 'idProveedorClasificacion', value: req.body.idProveedorClasificacion, type: self.model.types.INT },
            { name: 'direccion', value: req.body.direccion, type: self.model.types.STRING },
            { name: 'latitud', value: req.body.latitud, type: self.model.types.STRING },
            { name: 'longitud', value: req.body.longitud, type: self.model.types.STRING },
            { name: 'poligono', value: req.body.poligono, type: self.model.types.STRING },
            { name: 'jsonCombustible', value: req.body.JSONCombustible, type: self.model.types.STRING },
            { name: 'jsonEspecialidad', value: req.body.JSONEspecialidad, type: self.model.types.STRING },
            // Datos fiscales
            { name: 'tipoPersona', value: req.body.tipoPersona, type: self.model.types.STRING },
            { name: 'pais', value: req.body.pais, type: self.model.types.STRING },
            { name: 'estado', value: req.body.estado, type: self.model.types.STRING },
            { name: 'ciudad', value: req.body.ciudad, type: self.model.types.STRING },
            { name: 'delegacion', value: req.body.delegacion, type: self.model.types.STRING },
            { name: 'colonia', value: req.body.colonia, type: self.model.types.STRING },
            { name: 'calle', value: req.body.calle, type: self.model.types.STRING },
            { name: 'numInt', value: req.body.numInt, type: self.model.types.STRING },
            { name: 'numExt', value: req.body.numExt, type: self.model.types.STRING },
            { name: 'cp', value: req.body.cp, type: self.model.types.STRING },
            { name: 'lada', value: req.body.lada, type: self.model.types.STRING }
        ]
        // Llamada a SP
    this.query.execute('INS_PROVEEDOR_SP', params, res)
}

Proveedor.prototype.post_agregarespecialidad = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.body.idProveedor, type: self.model.types.INT },
            { name: 'json', value: req.body.json, type: self.model.types.STRING }
        ]
        // Llamada a SP
    this.query.execute('INS_PROVEEDOR_ESPECIALIDAD_SP', params, res)
}

Proveedor.prototype.post_agregartipounidad = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.body.idProveedor, type: self.model.types.INT },
            { name: 'json', value: req.body.json, type: self.model.types.STRING }
        ]
        // Llamada a SP
    this.query.execute('INS_PROVEEDOR_TIPO_UNIDAD_SP', params, res)
}

Proveedor.prototype.post_agregardocumentoencabezado = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
            { name: 'idProveedorEncabezado', value: req.body.idProveedor, type: self.model.types.INT },
            { name: 'idDocumento', value: req.body.idDocumento, type: self.model.types.INT },
            { name: 'folio', value: req.body.folio, type: self.model.types.STRING },
            { name: 'vigencia', value: req.body.vigencia, type: self.model.types.DATE },
            { name: 'archivo', value: req.body.archivo, type: self.model.types.STRING }
        ]
        // Llamada a SP
    this.query.execute('INS_PROVEEDOR_ENCABEZADO_DOCUMENTO_SP', params, res)
}

Proveedor.prototype.put_actualizar = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.body.idProveedor, type: self.model.types.INT },
            { name: 'nombreComercial', value: req.body.nombreComercial, type: self.model.types.STRING },
            { name: 'razonSocial', value: req.body.razonSocial, type: self.model.types.STRING },
            { name: 'RFC', value: req.body.RFC, type: self.model.types.STRING },
            { name: 'contacto', value: req.body.contacto, type: self.model.types.STRING },
            { name: 'telefono', value: req.body.telefono, type: self.model.types.STRING },
            { name: 'mail', value: req.body.mail, type: self.model.types.STRING },
            { name: 'fechaInicio', value: req.body.fechaInicio, type: self.model.types.DATE },
            { name: 'idCategoria', value: req.body.idCategoria, type: self.model.types.INT },
            { name: 'idProveedorClasificacion', value: req.body.idProveedorClasificacion, type: self.model.types.INT },
            { name: 'direccion', value: req.body.direccion, type: self.model.types.STRING },
            { name: 'latitud', value: req.body.latitud, type: self.model.types.STRING },
            { name: 'longitud', value: req.body.longitud, type: self.model.types.STRING },
            { name: 'poligono', value: req.body.poligono, type: self.model.types.STRING },
            { name: 'jsonCombustible', value: req.body.JSONCombustible, type: self.model.types.STRING },
            { name: 'jsonEspecialidad', value: req.body.JSONEspecialidad, type: self.model.types.STRING },
            // Datos fiscales
            { name: 'tipoPersona', value: req.body.tipoPersona, type: self.model.types.STRING },
            { name: 'pais', value: req.body.pais, type: self.model.types.STRING },
            { name: 'estado', value: req.body.estado, type: self.model.types.STRING },
            { name: 'ciudad', value: req.body.ciudad, type: self.model.types.STRING },
            { name: 'delegacion', value: req.body.delegacion, type: self.model.types.STRING },
            { name: 'colonia', value: req.body.colonia, type: self.model.types.STRING },
            { name: 'calle', value: req.body.calle, type: self.model.types.STRING },
            { name: 'numInt', value: req.body.numInt, type: self.model.types.STRING },
            { name: 'numExt', value: req.body.numExt, type: self.model.types.STRING },
            { name: 'cp', value: req.body.cp, type: self.model.types.STRING },
            { name: 'lada', value: req.body.lada, type: self.model.types.STRING }
        ]
        // Llamada a SP
    this.query.execute('UPD_PROVEEDOR_SP', params, res)
}

Proveedor.prototype.put_acceso = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.body.idProveedor, type: self.model.types.INT },
            { name: 'nombre', value: req.body.nombre, type: self.model.types.STRING },
            { name: 'mail', value: req.body.mail, type: self.model.types.STRING },
            { name: 'usuario', value: req.body.usuario, type: self.model.types.STRING },
            { name: 'password', value: req.body.password, type: self.model.types.STRING }
        ]
        // Llamada a SP
    this.query.execute('UPD_PROVEEDOR_ACCESO_SP', params, res)
}

Proveedor.prototype.delete_eliminar = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedor', value: req.body.idProveedor, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('DEL_PROVEEDOR_SP', params, res)
}

Proveedor.prototype.get_obtenerencabezado = function(req, res, next) {

    var self = this

    var params = []

    this.query.execute('SEL_PROVEEDOR_ENCABEZADO_SP', params, res)
}

Proveedor.prototype.get_obtenerencabezadobyid = function(req, res, next) {
    var self = this

    var params = [
        { name: 'idProveedorEncabezado', value: req.query.idProveedorEncabezado, type: self.model.types.INT }
    ]

    this.query.execute('SEL_PROVEEDOR_ENCABEZADO_BYID_SP', params, res)
}

Proveedor.prototype.post_agregarsucursal = function(req, res, next) {
    var self = this

    var params = [
        { name: 'idProveedorEncabezado', value: req.body.proveedor.idProveedor, type: self.model.types.INT },
        { name: 'nombreComercial', value: req.body.proveedor.nombreSucursal, type: self.model.types.STRING },
        { name: 'razonSocial', value: req.body.proveedor.razonSocial, type: self.model.types.STRING },
        { name: 'RFC', value: req.body.proveedor.RFC, type: self.model.types.STRING },
        { name: 'contacto', value: req.body.proveedor.contacto, type: self.model.types.STRING },
        { name: 'telefono', value: req.body.proveedor.telefono, type: self.model.types.STRING },
        { name: 'mail', value: req.body.proveedor.mail, type: self.model.types.STRING },
        { name: 'fechaInicio', value: req.body.proveedor.fechaInicio, type: self.model.types.DATE },
        { name: 'idCategoria', value: req.body.proveedor.idCategoria, type: self.model.types.INT },
        { name: 'idProveedorClasificacion', value: req.body.proveedor.idProveedorClasificacion, type: self.model.types.INT },
        { name: 'idProveedorSubClasificacion', value: req.body.idProveedorSubClasificacion, type: self.model.types.STRING },
        { name: 'direccion', value: req.body.proveedor.direccion, type: self.model.types.STRING },
        { name: 'latitud', value: req.body.proveedor.latitud, type: self.model.types.STRING },
        { name: 'longitud', value: req.body.proveedor.longitud, type: self.model.types.STRING },
        { name: 'poligono', value: req.body.proveedor.poligono, type: self.model.types.STRING },
        { name: 'JSONCombustible', value: req.body.JSONCombustible, type: self.model.types.STRING },
        { name: 'JSONDIESEL', value: req.body.JSONDIESEL, type: self.model.types.STRING },
        { name: 'JSONGasolina', value: req.body.JSONGasolina, type: self.model.types.STRING }
    ]

    this.query.execute('INS_PROVEEDOR_SUCURSAL_SP', params, res)
}


Proveedor.prototype.put_actualizarsucursal = function(req, res, next) {
    var self = this

    var params = [
        { name: 'idProveedor', value: req.body.proveedor.idSucursal, type: self.model.types.INT },
        { name: 'idProveedorEncabezado', value: req.body.proveedor.idProveedor, type: self.model.types.INT },
        { name: 'nombreComercial', value: req.body.proveedor.nombreSucursal, type: self.model.types.STRING },
        { name: 'razonSocial', value: req.body.proveedor.razonSocial, type: self.model.types.STRING },
        { name: 'RFC', value: req.body.proveedor.RFC, type: self.model.types.STRING },
        { name: 'contacto', value: req.body.proveedor.contacto, type: self.model.types.STRING },
        { name: 'telefono', value: req.body.proveedor.telefono, type: self.model.types.STRING },
        { name: 'mail', value: req.body.proveedor.mail, type: self.model.types.STRING },
        { name: 'fechaInicio', value: req.body.proveedor.fechaInicio, type: self.model.types.DATE },
        { name: 'idCategoria', value: req.body.proveedor.idCategoria, type: self.model.types.INT },
        { name: 'idProveedorClasificacion', value: req.body.proveedor.idProveedorClasificacion, type: self.model.types.INT },
        { name: 'idProveedorSubClasificacion', value: req.body.idProveedorSubClasificacion, type: self.model.types.STRING },
        { name: 'direccion', value: req.body.proveedor.direccion, type: self.model.types.STRING },
        { name: 'latitud', value: req.body.proveedor.latitude, type: self.model.types.STRING },
        { name: 'longitud', value: req.body.proveedor.longitude, type: self.model.types.STRING },
        { name: 'poligono', value: req.body.proveedor.poligono, type: self.model.types.STRING },
        { name: 'JSONCombustible', value: req.body.JSONCombustible, type: self.model.types.STRING },
        { name: 'JSONDIESEL', value: req.body.JSONDIESEL, type: self.model.types.STRING },
        { name: 'JSONGasolina', value: req.body.JSONGasolina, type: self.model.types.STRING }
    ]

    this.query.execute('UPD_PROVEEDOR_SUCURSAL_SP', params, res)
}



Proveedor.prototype.post_agregarencabezado = function(req, res, next) {
    var self = this

    var params = [
        { name: 'nombreComercial', value: '', type: self.model.types.STRING },
        { name: 'razonSocial', value: req.body.razonSocial, type: self.model.types.STRING },
        { name: 'RFC', value: req.body.RFC, type: self.model.types.STRING },
        { name: 'contacto', value: '', type: self.model.types.STRING },
        { name: 'telefono', value: '', type: self.model.types.STRING },
        { name: 'mail', value: '', type: self.model.types.STRING },
        { name: 'fechaInicio', value: req.body.fechaInicio, type: self.model.types.DATE },
        { name: 'idCategoria', value: req.body.idCategoria, type: self.model.types.INT },
        { name: 'idProveedorClasificacion', value: req.body.idProveedorClasificacion, type: self.model.types.INT },
        // Datos fiscales
        { name: 'tipoPersona', value: req.body.tipoPersona, type: self.model.types.STRING },
        { name: 'pais', value: req.body.pais, type: self.model.types.STRING }, 
        { name: 'estado', value: req.body.estado, type: self.model.types.STRING },
        { name: 'ciudad', value: req.body.ciudad, type: self.model.types.STRING },
        { name: 'delegacion', value: req.body.delegacion, type: self.model.types.STRING },
        { name: 'colonia', value: req.body.colonia, type: self.model.types.STRING },
        { name: 'calle', value: req.body.calle, type: self.model.types.STRING },
        { name: 'numInt', value: req.body.numInt, type: self.model.types.STRING },
        { name: 'numExt', value: req.body.numExt, type: self.model.types.STRING },
        { name: 'cp', value: req.body.cp, type: self.model.types.STRING },
        { name: 'lada', value: req.body.lada, type: self.model.types.STRING },
        { name: 'logo', value: req.body.logo, type: self.model.types.STRING }
    ]

    this.query.execute('INS_PROVEEDOR_ENCABEZADO_SP', params, res)
}

Proveedor.prototype.put_actualizarencabezado = function(req, res, next) {
    var self = this

    var params = [
        { name: 'idProveedorEncabezado', value: req.body.idProveedor, type: self.model.types.INT },
        { name: 'nombreComercial', value: '', type: self.model.types.STRING },
        { name: 'razonSocial', value: req.body.razonSocial, type: self.model.types.STRING },
        { name: 'RFC', value: req.body.RFC, type: self.model.types.STRING },
        { name: 'contacto', value: '', type: self.model.types.STRING },
        { name: 'telefono', value: '', type: self.model.types.STRING },
        { name: 'mail', value: '', type: self.model.types.STRING },
        //{ name: 'fechaInicio', value: req.body.fechaInicio, type: self.model.types.DATE },
        { name: 'idCategoria', value: req.body.idCategoria, type: self.model.types.INT },
        { name: 'idProveedorClasificacion', value: req.body.idProveedorClasificacion, type: self.model.types.INT },
        // Datos fiscales
        { name: 'tipoPersona', value: req.body.tipoPersona, type: self.model.types.STRING },
        { name: 'pais', value: req.body.pais, type: self.model.types.STRING },
        { name: 'estado', value: req.body.estado, type: self.model.types.STRING },
        { name: 'ciudad', value: req.body.ciudad, type: self.model.types.STRING },
        { name: 'delegacion', value: req.body.delegacion, type: self.model.types.STRING },
        { name: 'colonia', value: req.body.colonia, type: self.model.types.STRING },
        { name: 'calle', value: req.body.calle, type: self.model.types.STRING },
        { name: 'numInt', value: req.body.numInt, type: self.model.types.STRING },
        { name: 'numExt', value: req.body.numExt, type: self.model.types.STRING },
        { name: 'cp', value: req.body.cp, type: self.model.types.STRING },
        { name: 'lada', value: req.body.lada, type: self.model.types.STRING },
        { name: 'logo', value: req.body.logo, type: self.model.types.STRING }
    ]

    this.query.execute('UPD_PROVEEDOR_ENCABEZADO_SP', params, res)
}

Proveedor.prototype.delete_eliminarencabezado = function(req, res, next) {
    var self = this

    var params = [
        { name: 'idProveedorEncabezado', value: req.body.idProveedorEncabezado, type: self.model.types.INT }

    ]

    this.query.execute('DEL_PROVEEDOR_ENCABEZADO_SP', params, res)
}

Proveedor.prototype.get_obtenerempresabyid = function(req, res, next){
    var self = this

    var params = [
        { name: 'idProveedorEncabezado', value: req.query.idProveedorEncabezado, type: self.model.types.INT }
    ]

    this.query.execute('SEL_EMPRESA_PROVEEDOR_ENCABEZADO_SP', params, res)
}

Proveedor.prototype.post_agregardocumentosucursal = function(req, res, next){
    var self = this

    var params = [
        { name: 'idProveedor', value: req.body.idProveedor, type: self.model.types.INT },
        { name: 'idDocumento', value: req.body.idDocumento, type: self.model.types.INT },
        { name: 'archivo', value: req.body.evidencia, type: self.model.types.STRING }
    ]

    this.query.execute('INS_PROVEEDOR_SUCURSAL_DOCUMENTO_SP', params, res)
}

Proveedor.prototype.get_obtenerdocumentosucursalbyid = function(req, res, next){
    var self = this

    var params = [
        { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT }
    ]

    this.query.execute('SEL_DOCUMENTO_SUCURSAL_BYID_SP', params, res)
}

Proveedor.prototype.get_obtenerdocumentosucursalddl = function(req, res, next){
    var self = this

    var params = [
    ]

    this.query.execute('SEL_DOCUMENTOS_SUCURSAL_DDL_SP', params, res)
}

Proveedor.prototype.delete_eliminardocumentoencabezado = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedorEncabezadoDocumento', value: req.body.idProveedorEncabezadoDocumento, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('DEL_PROVEEDOR_ENCABEZADO_DOCUMENTO_SP', params, res)
}

Proveedor.prototype.delete_eliminardocumentosucursal = function(req, res, next) {
    // Referencia a la clase para callback
    var self = this
        // Obtención de valores de los parámetros del request
    var params = [
            { name: 'idProveedorDocumento', value: req.body.idProveedorDocumento, type: self.model.types.INT }
        ]
        // Llamada a SP
    this.query.execute('DEL_PROVEEDOR_SUCURSAL_DOCUMENTO_SP', params, res)
}

module.exports = Proveedor