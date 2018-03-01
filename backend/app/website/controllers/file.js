var FileView = require('../views/speaker'),
  FileModel = require('../models/dataAccess'),
  multer = require('multer'),
  path = require('path')

  var dirname = 'E:/ASEv2Documentos/public/';
  //var dirname = 'C:/Desarrollo de Software/Grupo Andrade/Software/ASEv2Documentos/public/'

var File = function (conf) {
  this.conf = conf || {}

  this.view = new FileView()
  this.model = new FileModel(this.conf.connection)

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

File.prototype.get_download = function (req, res, next) {
  var self = this
  // Descargo el archivo
  var file = path.resolve(__dirname, '../uploads/') + '/' + req.query.nombre
  res.download(file)
}

File.prototype.post_upload = function (req, res, next) {
  var self = this
  var namePart = null
  var id = null
  var randomName = ""

  var storage = multer.diskStorage({
    destination: function(req, file, cb){
      nameFile = dirname + 'partidas';
      cb(null, nameFile);
      res.end(randomName)
    },
    filename: function(req, file, cb){
      if (file.mimetype == "image/png")
        randomName = new Date().getTime().toString() + ".jpg"
      if (file.mimetype == "image/jpeg")
        randomName = new Date().getTime().toString() + ".jpg"
      if (file.mimetype == "application/pdf")
        randomName = new Date().getTime().toString() + ".pdf"
      
        path = nameFile + randomName
        cb(null, randomName)
    }
  });
  /*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
      namePart = Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
      cb(null, namePart)
    }
  })*/

  var upload = multer({ storage: storage }).any()

  // Obtención de valores de los parámetros del request
  upload(req, res, function (err) {
    /*if (!err) {
      self.view.speakJSON(res, {
        error: null,
        result: randomName
      })
    } else {
      // Everything went fine 
      self.view.speakJSON(res, {
        error: err,
        result: null
      })
    }*/
  })
}

module.exports = File
