'use strict'

var express = require('express');
var ConfgrationController = require('../controllers/configuration');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/configuration/:id', md_auth.ensureAuth, ConfgrationController.getConfiguration);
api.get('/configuration-name/:name', md_auth.ensureAuth, ConfgrationController.getConfigurationByName);
api.get('/configurations/:pages?', md_auth.ensureAuth, ConfgrationController.getConfigurations);
api.post('/configuration', md_auth.ensureAuth, ConfgrationController.saveConfiguration);
api.put('/configuration/:id', md_auth.ensureAuth, ConfgrationController.updateConfiguration);
api.delete('/configuration/:id', md_auth.ensureAuth, ConfgrationController.deleteConfiguration);

module.exports = api;