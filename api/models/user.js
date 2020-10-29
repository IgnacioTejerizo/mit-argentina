'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    dni: String,
    address: String,
    email: String,
    phone: String,
    username: String,
    password: String,
    role: String,
    region: Number
});

module.exports = mongoose.model('User', UserSchema);