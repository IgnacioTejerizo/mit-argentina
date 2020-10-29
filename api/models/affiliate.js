'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AffiliateSchema = Schema({
    name: String,
    surname: String,
    dni: String,
    cuil: String,
    address: String,
    email: String,
    phone: String,
    cbu: String,
    admissionDate: Date,
    nextColectionDate: Date,
    situation: String,
    condition: String,
    assets: String,
    observation: String,
    region: Number
});

module.exports = mongoose.model('Affiliate', AffiliateSchema);