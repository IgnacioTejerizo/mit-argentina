'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3797;
//var url = 'mongodb+srv://itproduction:ITEBM123+@mit-argentina.kwt3z.mongodb.net/dbmit-argentina?retryWrites=true&w=majority'
var url = 'mongodb://localhost:27017/dbmusify'

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url, (err, res) => {
    if (err) {
        throw err;
    }
    else {
        console.log("La base de datos esta corriendo correctamente");
        app.listen(port, function () {
            console.log("Servidor del api rest levantado");
        });
    }
});