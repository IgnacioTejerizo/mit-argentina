'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CreditSchema = Schema({
    capital: Number,
    dues: Number,
    importes: Number,
    amount: Number,
    region: Number,
    user: { type: Schema.ObjectId, ref: 'User' },
    affiliate: { type: Schema.ObjectId, ref: 'Affiliate' }
});

module.exports = mongoose.model('Credit', CreditSchema);