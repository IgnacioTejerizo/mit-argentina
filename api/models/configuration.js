'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfigurationSchema = Schema({
    name: String,
    value: Number
});

module.exports = mongoose.model('Configuration', ConfigurationSchema);