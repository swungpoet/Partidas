var Speaker = function (conf) {
    conf = conf || {};
}

function logError(err, res) {
    res.writeHead(500, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(err));
    res.end("");
}

Speaker.prototype.speakJSON = function (res, object) {
    //Estándar de implementación de errores
    if (object.error) {
        logError(object.error, res);
        return;
    }

    if (object.result) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(object.result));
        res.end("");
    }
}

module.exports = Speaker;
