'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/zoo',{ useNewUrlParser: true }, (err, res)=>{
if(err){
    throw err;
}else{
    console.log('La conexión a la bd zoo se ha realizado correctamente');

    app.listen(port, ()=>{
        console.log("El servidor local con node y express está corriendo correctamente en el puerto: "+port);
    })
}
});



