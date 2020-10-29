'use strict'

var mongoosePaginate = require('mongoose-pagination')
var Credit = require('../models/credit');

function getCredit(req, res) {
    try {
        var creditId = req.params.id;
    
        Credit.findById(creditId, (err, credit) => {
            if (err) {
                res.status(500).send({ message: 'Error al obtener el crédito' });
            } else {
                if (!credit) {
                    res.status(404).send({ message: 'El crédito no existe' });
                } else {
                    res.status(200).send({ credit });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function getCredits(req, res) {
    try {
        var affiliateId = req.params.affiliate;

        if (!affiliateId) {
            var find = Credit.find({}).sort('capital');
        } else {
            var find = Credit.find({ affiliate: affiliateId}).sort('capital');
        }

        find.populate({
            path: 'affiliate',
            model: 'Affiliate'
        }).exec(function (err, credits){
            if (err) {
                res.status(500).send({ message: 'Error al obtener los créditos' });
            } else {
                if (!credits) {
                    res.status(404).send({ message: 'No hay créditos' });
                } else {
                    return res.status(200).send({credits});
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function getCreditsList(req, res) {
    try {
        if (req.params.pages) {
            var page = req.params.pages;
        } else {
            var page = 1;
        }

        var itemsPerPage = 20;
    
        Credit.find().sort('capital').paginate(page, itemsPerPage, function(err, credits, total) {
            if (err) {
                res.status(500).send({ message: 'Error al obtener los créditos' });
            } else {
                if (!credits) {
                    res.status(404).send({ message: 'No hay créditos' });
                } else {
                    return res.status(200).send({ 
                        totalItems: total,
                        credits: credits
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function saveCredit(req, res) {
    try {
        var credit = new Credit();
        var params = req.body;
    
        credit.capital = params.capital;
        credit.dues = params.dues;
        credit.importes = params.importes;
        credit.amount = params.amount;
        credit.user = params.user;
        credit.affiliate = params.affiliate;
        credit.region = params.region;

        credit.save((err, creditStored) => {
            if (err) {
                res.status(500).send({ message: 'Se produjo un error al guardar el Crédito'});
            } else {
                if (!creditStored) {
                    res.status(404).send({ message: 'No Crédito no fue guardado'});
                } else {
                    res.status(200).send({ credit: creditStored});
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function updateCredit(req, res) {
    try {
        var creditId = req.params.id;
        var update = req.body;

        Credit.findByIdAndUpdate(creditId, update, (err, creditUpdated) => {
            if (err) {
                res.status(500).send({ message: 'Se produjo un error al actualizar el Crédito'});
            } else {
                if (!creditUpdated) {
                    res.status(404).send({ message: 'No se encontro el Crédito especificado'});
                } else {
                    res.status(200).send({ credit: creditUpdated});
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function deleteCredit(req, res) {
    try {
        var creditId = req.params.id;

        Credit.findByIdAndRemove(creditId, (err, creditDelted) =>{
            if (err) {
                res.status(500).send({ message: 'Se produjo un error al eliminar el Crédito'});
            } else {
                if (!creditDelted) {
                    res.status(404).send({ message: 'No se encontro el Crédito especificado'});
                } else {
                    res.status(200).send({ credit: creditDelted});
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

module.exports = {
    getCredit,
    getCredits,
    getCreditsList,
    saveCredit,
    updateCredit,
    deleteCredit
};