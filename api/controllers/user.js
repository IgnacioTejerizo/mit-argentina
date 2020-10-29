'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function saveUser(req, res) {
    try {
        var user = new User();
        var params = req.body;
    
        user.name = params.name.toLowerCase();
        user.surname = params.surname.toLowerCase();
        user.dni = params.dni;
        user.address = params.address;
        user.email = params.email;
        user.phone = params.phone;
        user.username = params.username.toLowerCase();
        user.role = params.role;
        user.region = params.region;
    
        if (params.password) {
            bcrypt.hash(params.password, null, null, function(err, hash){
                user.password = hash;

                if (user.name != null && user.surname != null && user.dni != null) {
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ message: 'Se produjo un error al guardar el Usuario'});
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: 'No se guardo el usuario'});
                            } else {
                                res.status(200).send({user: userStored});
                            }
                        }
                    });
                } else {
                    res.status(200).send({ message: 'Introduce todos los campos'});
                }
            });
        }else{
            res.status(200).send({ message: 'Introduce la Contraseña'});
        }
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

function loginUser(req, res) {
    try {
        var params = req.body;
    
        var username = params.username;
        var password = params.password;
        var region = params.region;
        
        User.findOne({$and: [{ username: username.toLowerCase() }, { region: region }]}, (err, user) =>{
            if (err) {
                res.status(500).send({ message: 'Error al obtener el usuario'});
            } else {
                if (!user) {
                    res.status(404).send({ message: 'El usuario no existe'});
                } else {
                    bcrypt.compare(password, user.password, function (err, check){
                        console.log(check);
                        if (check) {
                            if (params.gethash) {
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });
                            } else {
                                res.status(200).send({user});
                            }
                        } else {
                            res.status(404).send({ message: 'El usuario no ha podido loguearse'});
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

function updateUser(req, res) {
    try {
        var userId = req.params.id;
        var update = req.body;

        if (userId != req.user.sub) {
            return res.status(500).send({ message: 'No tienes permiso para actualizar este usuario'});
        }
    
        User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
            if (err) {
                res.status(500).send({ message: 'Error al actualizar el usuario'});
            } else {
                if (!userUpdated) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usaurio'});
                } else {
                    res.status(200).send({ user: userUpdated });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Ocurrio un error en la Aplicacion, Por Favor Contacte con el Administrador'});
        console.log(error);
    }
}

module.exports = {
    saveUser,
    loginUser,
    updateUser
};