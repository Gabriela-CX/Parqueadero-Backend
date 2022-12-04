const mongoose = require('mongoose');

const SuscripcionSchema = mongoose.Schema({
    tipoSuscripcion:{
        type:String,
        required:true
    },
    precio:{
        type:String,
        required:true
    },
    beneficios:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model('Suscripcion', SuscripcionSchema);