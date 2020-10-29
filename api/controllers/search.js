'use strict'

var mongoosePaginate = require('mongoose-pagination')
var Affiliate = require('../models/affiliate');

function getAffiliates(req, res) {
    try {
        if (req.params.value && req.params.value != undefined) {
            var search = req.params.value;
        } else {
            var search = '';
        }

        if (req.params.pages) {
            var page = req.params.pages;
        } else {
            var page = 1;
        }

        var itemsPerPage = 20;

        Affiliate.find({name: search.toLowerCase() }).sort('name').paginate(page, itemsPerPage, function(err, affiliatesName, total) {
            if (err) {
                res.status(500).send({ message: 'Error al obtener los afiliados' });
            } else {
                if (!affiliatesName || affiliatesName.length == 0) {
                    Affiliate.find({surname: search.toLowerCase() }).sort('name').paginate(page, itemsPerPage, function(err, affiliatesSurname, total) {
                        if (err) {
                            res.status(500).send({ message: 'Error al obtener los afiliados' });
                        } else {
                            if (!affiliatesSurname || affiliatesSurname.length == 0) {
                                Affiliate.find({dni: search.toLowerCase() }).sort('name').paginate(page, itemsPerPage, function(err, affiliatesDni, total) {
                                    if (err) {
                                        res.status(500).send({ message: 'Error al obtener los afiliados' });
                                    } else {
                                        if (!affiliatesDni || affiliatesDni.length == 0) {
                                            Affiliate.find({cuil: search.toLowerCase() }).sort('name').paginate(page, itemsPerPage, function(err, affiliatesCuil, total) {
                                                if (err) {
                                                    res.status(500).send({ message: 'Error al obtener los afiliados' });
                                                } else {
                                                    if (!affiliatesCuil || affiliatesCuil.length == 0) {
                                                        Affiliate.find().sort('name').paginate(page, itemsPerPage, function(err, affiliatesAll, total) {
                                                            if (err) {
                                                                res.status(500).send({ message: 'Error al obtener los afiliados' });
                                                            } else {
                                                                if (!affiliatesAll || affiliatesAll.length == 0) {
                                                                    res.status(404).send({ message: 'No hay artistas' });
                                                                } else {
                                                                    return res.status(200).send({ 
                                                                        totalItems: total,
                                                                        affiliates: affiliatesAll
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    } else {
                                                        return res.status(200).send({ 
                                                            totalItems: total,
                                                            affiliates: affiliatesCuil
                                                        });
                                                    }
                                                }
                                            });
                                        } else {
                                            return res.status(200).send({ 
                                                totalItems: total,
                                                affiliates: affiliatesDni
                                            });
                                        }
                                    }
                                });
                            } else {
                                return res.status(200).send({ 
                                    totalItems: total,
                                    affiliates: affiliatesSurname
                                });
                            }
                        }
                    });
                } else {
                    return res.status(200).send({ 
                        totalItems: total,
                        affiliates: affiliatesName
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador' });
        console.log(error);
    }
}

module.exports = {
    getAffiliates
};