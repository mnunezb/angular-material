'use strict'

//Modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

//Modelos
var User = require('../models/user');

//servicio jwt
var jwt = require('../services/jwt');

//Acciones
function pruebas(req, res){
    res.status(200).send({
        message: 'probando el controlador de usuarios y la accion pruebas',
        user: req.user
    });
}

function saveUser(req, res){

    // Crear objeto usuario
    var user = new User();

    //Recoger parametros peticion
    var params = req.body;

    

    if(params.password && params.name && params.surname && params.email){
    //Asignar valores al objeto usuario
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = null;

    User.findOne({email: user.email.toLowerCase()}, (err, issetUser) =>{
        if(err){
            return res.status(500).send({message: 'Error al comprobar el usuario'});
        }else{
            if(!issetUser){
                //Cifrar  contraseña
           bcrypt.hash(params.password, null, null, function(err, hash){
          user.password = hash;

        //Guardar usuario en BD
        user.save((err, userStored)=>{
            if(err){
                return res.status(500).send({message: 'Error al guardar el usuario'});
            }else{
                if(!userStored){
                  return  res.status(404).send({message: 'No se ha guardado el usuario'});
                }else{
                    return res.status(200).send({message: userStored})
                                }
                            }
                        })
                    });
            }else{
                res.status(200).send({
                 message: 'El usuario no puede registrarse'
                })
            }
        }
    })

    
    }else{
        res.status(200).send({
            message: 'Introduce los datos correctamente para poder registrar al usuario'
        })
    }
}

function login(req, res){

    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) =>{
        if(err){
            return res.status(500).send({message: 'Error al comprobar el usuario'});
        }else{
            if(user){
                bcrypt.compare(password, user.password, (err, check)=>{
                    if(check){
                        
                        if(params.gettoken){

                            //Devolver el token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })

                
                        }else{
                            res.status(200).send({
                                user
                               });
                        }
                       
                    }else{
                        res.status(404).send({
                            message: 'El usuario no ha podido loguearse correctamnete'
                        });
                    }
                });
                
                 }else{
            res.status(404).send({
                message: 'El usuario no ha podido loguearse'
            });
            }

}
    });
}

function updateUser(req, res){

    var userId = req.params.id;
    var update = req.body;

    delete update.password;

    if(userId != req.user.sub){
        return res.status(500).send({
            message: 'No tienes permisos para actualizar el usuario'
        });
    }

    User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
        if(err){
            return res.status(500).send({
                message: 'Error al actualizar usurio'
            });
        }else{
            if(!userUpdated){
                return res.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                });
            }else{
                return  res.status(200).send({
                    user: userUpdated
                });
            }
        }
    });

}

function uploadImage(req, res){

    var userId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        console.log({
            file_path,
            file_split,
            file_name
        });
        // file_name = '1';

        var ext_split = file_name.split('\.')
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){

            if(userId != req.user.sub){
                return res.status(500).send({
                    message: 'No tienes permisos para actualizar el usuario'
                });
            }

            User.findByIdAndUpdate(userId, {image: file_name}, {new: true}, (err, userUpdated)=>{
                if(err){
                    return res.status(500).send({
                        message: 'Error al actualizar usurio'
                    });
                }else{
                    if(!userUpdated){
                        return res.status(404).send({
                            message: 'No se ha podido actualizar el usuario'
                        });
                    }else{
                        return  res.status(200).send({
                            user: userUpdated,
                            image: file_name
                        });
                    }
                }
            });

        }else{
            fs.unlink(file_path, (err)=>{
                if(err){
                return res.status(200).send({
                    message: 'Extensión no válida y fichero no borrado'
                    });            }else{
                return res.status(200).send({
                    message: 'Extensión no válida'
                });
            }
            });
            return res.status(200).send({
                message: 'Extensión no válida y fichero eliminado'
            });
        }

    }else{
        return res.status(200).send({
            message: 'No se han subido archivos'
        });
    }
  
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile;

    fs.access(path_file, (err) => {
        if (!err) {
            res.status(200).sendFile(path.resolve(path_file));
        }else{
            // console.log(path_file);
            res.status(404).send({message: 'File do not exists'})
        }
    });    
}

function getKeppers(req, res){
    User.find({role: 'ROLE_ADMIN'}).exec((err, users)=>{
        if(err){
            res.status(500).send({
                message: 'Error en la petición'
            });
        }else{
            if(!users){
                res.status(404).send({
                    message: 'No hay cuidadores'
                });
            }else{
                res.status(200).send({
                    users
                });
            }
        }
    })
}


module.exports={
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage,
    getImageFile,
    getKeppers
};