'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'mit_2020_it123+';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticacion'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            res.status(401).send({ message: 'El token ha expirado'});
        }
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }

    req.user = payload;

    next();
};