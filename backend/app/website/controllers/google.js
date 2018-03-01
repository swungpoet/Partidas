var QueryView = require('../views/speaker'),
    distance = require('google-distance-matrix')

var Google = function (conf) {
    this.conf = conf || {}
    // Inicializo el objeto
    this.view = new QueryView()
    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
    }
}

Google.prototype.get_distancia = function (req, res, next) {
    // Referencia a la clase para callback
    var self = this
    var origins = ["" + req.query.latOrigen + "," + req.query.lngOrigen + ""];
    var destinations = ["" + req.query.latDestino + "," + req.query.lngDestino + ""];
    distance.key("AIzaSyAvJ3AAfkwsjYSVgVTedzomUz82nO9WP3Q")
    distance.matrix(origins, destinations, function (err, distances) {
        if (!err) {
            self.view.speakJSON(res, {
                error: err,
                result: distances
            })
        }

    })
}

module.exports = Google