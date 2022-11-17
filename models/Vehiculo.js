const mongoose = require('mongoose');

const VehiculoSchema = mongoose.Schema({
    nroPlaca:{
        type:String,
        required:true
    },
    modelo:{
        type:String,
        required:true
    },
    horaEntrada:{
        type:Date,
        required:true
    },
    horaSalida:{
        type:Date,
        required:true
    },
    tiquete:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tiquete',
        required:true
    },
    celda:{
        type:Number,
        required:true
    },
    usuario:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Vehiculo', VehiculoSchema);
