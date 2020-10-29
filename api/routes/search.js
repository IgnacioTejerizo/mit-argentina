'use strict'

var express = require('express');
var SearchController = require('../controllers/search');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/search/:value?&:pages?', md_auth.ensureAuth, SearchController.getAffiliates);

module.exports = api;