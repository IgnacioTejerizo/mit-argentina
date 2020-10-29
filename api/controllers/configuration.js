'use strict'

var mongoosePaginate = require('mongoose-pagination')
var Configuration = require('../models/configuration');

function getConfiguration(req, res) {
    try {
        var configurationId = req.params.id;
    
        Configuration.findById(configurationId, (err, configuration) => {
            if (err) {
                res.status(500).send({ message: 'Error al obtener la configuracion' });
            } else {
                if (!configuration) {
                    res.status(404).send({ message: 'La Configuracion no existe' });
                } else {
                    res.status(200).send({ configuration });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function getConfigurationByName(req, res) {
    try {
        var configurationName = req.params.name;
    
        Configuration.findOne({ name: configurationName }, (err, configuration) => {
            if (err) {
                res.status(500).send({ message: 'Error al obtener la configuracion' });
            } else {
                if (!configuration) {
                    res.status(404).send({ message: 'La Configuracion no existe' });
                } else {
                    res.status(200).send({ configuration });
                }
            }
        })
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function getConfigurations(req, res) {
    try {
        if (req.params.pages) {
            var page = req.params.pages;
        } else {
            var page = 1;
        }

        var itemsPerPage = 20;
    
        Configuration.find().sort('value').paginate(page, itemsPerPage, function(err, configurations, total) {
            if (err) {
                res.status(500).send({ message: 'Error al obtener la configuracion' });
            } else {
                if (!configurations) {
                    res.status(404).send({ message: 'No hay configuracion' });
                } else {
                    return res.status(200).send({ 
                        totalItems: total,
                        configurations: configurations
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function saveConfiguration(req, res) {
    try {
        var configuration = new Configuration();
        var params = req.body;

        configuration.name = params.name;
        configuration.value = params.value;

        configuration.save((err, configuurationStored) => {
            if (err) {
                res.status(500).send({ message: 'Se produjo un error al guardar la Configuration'});
            } else {
                if (!configuurationStored) {
                    res.status(404).send({ message: 'La Configuration no fue guardado'});
                } else {
                    res.status(200).send({configuration: configuurationStored});
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function updateConfiguration(req, res) {
    try {
        var configurationId = req.params.id;
        var update = req.body;

        Configuration.findByIdAndUpdate(configurationId, update, (err, configurationUpdated) => {
            if (err) {
                res.status(500).send({ message: 'Se produjo un error al actualizar la Configuration'});
            } else {
                if (!configurationUpdated) {
                    res.status(404).send({ message: 'No se encontro la Configuration especificada'});
                } else {
                    res.status(200).send({ configuration: configurationUpdated});
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function deleteConfiguration(req, res) {
    try {
        var configurationId = req.params.id;

        Configuration.findByIdAndRemove(configurationId, (err, configurationDelted) =>{
            if (err) {
                res.status(500).send({ message: 'Se produjo un error al eliminar la Configuration'});
            } else {
                if (!configurationDelted) {
                    res.status(404).send({ message: 'No se encontro la F especificada'});
                } else {
                    res.status(200).send({ configuration: configurationDelted});
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

module.exports = {
    getConfiguration,
    getConfigurationByName,
    getConfigurations,
    saveConfiguration,
    updateConfiguration,
    deleteConfiguration
};