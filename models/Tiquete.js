const mongoose = require('mongoose');

const TiqueteSchema = mongoose.Schema({
    codigoFactura:{
        type:String,
        required:true
    },
    copiaFactura:{
        type:Boolean,
        required:true
    },
    fecha:{
        type:Date,
        required:true
    },
    suscripcion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Suscripcion',
        required:true
    } 
});

module.exports = mongoose.model('Tiquete', TiqueteSchema);