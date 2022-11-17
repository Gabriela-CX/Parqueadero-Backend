const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
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

module.exports = mongoose.model('Cliente', ClienteSchema);