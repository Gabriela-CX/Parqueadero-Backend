const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const URL = process.env.URL;


const getConnection = async () =>{
    console.log("Conectando a BD");

    try{
        await mongoose.connect(
            URL, 
            { 
                useNewUrlParser: true, 
                useUnifiedTopology: true 
            });
            console.log("Conexion Exitosa! ");
    }catch(error){
        console.log(error);
    }

}

module.exports = getConnection;
