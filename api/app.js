'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//rutas
var userRoutes = require('./routes/user');
var affiliateRoutes = require('./routes/affiliate');
var creditRoutes = require('./routes/credit');
var searchRoutes = require('./routes/search');
var configurationRoutes = require('./routes/configuration');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurar cabeceras http
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


//rutas base
app.use('/api', userRoutes);
app.use('/api', affiliateRoutes);
app.use('/api', creditRoutes);
app.use('/api', searchRoutes);
app.use('/api', configurationRoutes);

module.exports = app;