const mongoose = require('mongoose');

const SuscripcionSchema = mongoose.Schema({
    tipoSuscripcion:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Suscripcion', SuscripcionSchema);