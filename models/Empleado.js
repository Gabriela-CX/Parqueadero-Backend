const mongoose = require('mongoose');

const EmpleadoSchema = mongoose.Schema({
    pin:{
        type:String,
        required:true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);