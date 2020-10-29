'use strict'

var mongoosePaginate = require('mongoose-pagination')
var Affiliate = require('../models/affiliate');
var Credit = require('../models/credit');

function getAffiliate(req, res) {
    try {
        var affiliateId = req.params.id;
    
        Affiliate.findById(affiliateId, (err, affiliate) => {
            if (err) {
                res.status(500).send({ message: 'Error al obtener el afiliado' });
            } else {
                if (!affiliate) {
                    res.status(404).send({ message: 'El afiliado no existe' });
                } else {
                    res.status(200).send({ affiliate });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function getAffiliates(req, res) {
    try {
        if (req.params.pages) {
            var page = req.params.pages;
        } else {
            var page = 1;
        }

        var itemsPerPage = 20;
    
        Affiliate.find().sort('name').paginate(page, itemsPerPage, function(err, affiliates, total) {
            if (err) {
                res.status(500).send({ message: 'Error al obtener los afiliados' });
            } else {
                if (!affiliates) {
                    res.status(404).send({ message: 'No hay artistas' });
                } else {
                    return res.status(200).send({ 
                        totalItems: total,
                        affiliates: affiliates
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function saveAffiliate(req, res) {
    try {
        var affiliate = new Affiliate();
        var params = req.body;

        affiliate.name = params.name.toLowerCase();
        affiliate.surname = params.surname.toLowerCase();
        affiliate.dni = params.dni;
        affiliate.cuil = params.cuil;
        affiliate.address = params.address;
        affiliate.email = params.email;
        affiliate.phone = params.phone;
        affiliate.cbu = params.cbu;
        affiliate.admissionDate = params.admissionDate;
        affiliate.nextColectionDate = params.nextColectionDate;
        affiliate.situation = params.situation;
        affiliate.condition = params.condition;
        affiliate.assets = params.assets;
        affiliate.observation = params.observation;
        affiliate.region = params.region;

        affiliate.save((err, affiliateStored) => {
            if (err) {
                res.status(500).send({ message: 'Se produjo un error al guardar el Afiliado'});
            } else {
                if (!affiliateStored) {
                    res.status(404).send({ message: 'No Afiliado no fue guardado'});
                } else {
                    res.status(200).send({affiliate: affiliateStored});
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function updateAffiliate(req, res) {
    try {
        var affiliateId = req.params.id;
        var update = req.body;

        Affiliate.findByIdAndUpdate(affiliateId, update, (err, affiliateUpdated) => {
            if (err) {
                res.status(500).send({ message: 'Se produjo un error al actualizar el Afiliado'});
            } else {
                if (!affiliateUpdated) {
                    res.status(404).send({ message: 'No se encontro el Afiliado especificado'});
                } else {
                    res.status(200).send({ affiliate: affiliateUpdated});
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function deleteAffiliate(req, res) {
    try {
        var affiliateId = req.params.id;

        Affiliate.findByIdAndRemove(affiliateId, (err, affiliateDeleted) =>{
            if (err) {
                res.status(500).send({ message: 'Se produjo un error al eliminar el Afiliado'});
            } else {
                if (!affiliateDeleted) {
                    res.status(404).send({ message: 'No se encontro el Afiliado especificado'});
                } else {
                    Credit.find({ affiliate: affiliateDeleted._id}).deleteMany((err, creditDeleted) =>{
                        if (err) {
                            res.status(500).send({ message: 'Se produjo un error al eliminar los Créditos'});
                        } else {
                            if (!creditDeleted) {
                                res.status(404).send({ message: 'No se encontraron los créditos'});
                            } else {
                                res.status(200).send({ affiliate: affiliateDeleted});
                            }
                        }
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

module.exports = {
    getAffiliate,
    getAffiliates,
    saveAffiliate,
    updateAffiliate,
    deleteAffiliate
};