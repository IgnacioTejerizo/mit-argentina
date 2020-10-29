'use strict'

var express = require('express');
var AffiliateController = require('../controllers/affiliate');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/affiliate/:id', md_auth.ensureAuth, AffiliateController.getAffiliate);
api.get('/affiliates/:pages?', md_auth.ensureAuth, AffiliateController.getAffiliates);
api.post('/affiliate', md_auth.ensureAuth, AffiliateController.saveAffiliate);
api.put('/affiliate/:id', md_auth.ensureAuth, AffiliateController.updateAffiliate);
api.delete('/affiliate/:id', md_auth.ensureAuth, AffiliateController.deleteAffiliate);

module.exports = api;