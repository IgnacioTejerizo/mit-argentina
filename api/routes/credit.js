'use strict'

var express = require('express');
var CreditController = require('../controllers/credit');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/credit/:id', md_auth.ensureAuth, CreditController.getCredit);
api.get('/credits/:affiliate?', md_auth.ensureAuth, CreditController.getCredits);
api.get('/credits-list/:page?', md_auth.ensureAuth, CreditController.getCreditsList);
api.post('/credit', md_auth.ensureAuth, CreditController.saveCredit);
api.put('/credit/:id', md_auth.ensureAuth, CreditController.updateCredit);
api.delete('/credit/:id', md_auth.ensureAuth, CreditController.deleteCredit);

module.exports = api;