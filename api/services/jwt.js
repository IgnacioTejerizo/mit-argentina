'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'mit_2020_it123+';

exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        username: user.username,
        role: user.role,
        image: user.image,
        region: user.region,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    };

    return jwt.encode(payload, secret);
};