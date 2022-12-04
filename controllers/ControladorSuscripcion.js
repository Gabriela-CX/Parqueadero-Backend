const Suscripcion = require('../models/Suscripcion');

const getAll = async (req, res) =>{
    try {
        
        const response = await Suscripcion.find();
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Suscripcion.findById({ _id : id })

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validacion de la suscripcion
        const encontrarSuscripcion = await Suscripcion.findOne({ tipoSuscripcion: req.body.tipoSuscripcion });
        if(encontrarSuscripcion){ return res.status(400).json({ msj: "La suscripcion ya existe" }) }

        let suscripcion = new Suscripcion();
        
        suscripcion.tipoSuscripcion = req.body.tipoSuscripcion;
        suscripcion.precio = req.body.precio;
        suscripcion.beneficios = req.body.beneficios;

        suscripcion =  await suscripcion.save();

        res.status(200).send(suscripcion);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let suscripcionEncontrada = await Suscripcion.findById({ _id : id });
        if(!suscripcionEncontrada) { return res.status(404).json({mjs: "Suscripcion no encontrada"}) }

        const {  tipoSuscripcion, precio, beneficios } = req.body;

        let suscripcionExiste = await Suscripcion.findOne({ tipoSuscripcion : tipoSuscripcion, _id: { $ne : id } });
        if(suscripcionExiste) { return res.status(404).json({mjs: "La suscripcion ya existe"}) }

        suscripcionEncontrada.tipoSuscripcion = tipoSuscripcion;
        suscripcionEncontrada.precio = precio;
        suscripcionEncontrada.beneficios = beneficios;
        
        suscripcionEncontrada = await suscripcionEncontrada.save();

        res.status(202).send(suscripcionEncontrada);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update
}