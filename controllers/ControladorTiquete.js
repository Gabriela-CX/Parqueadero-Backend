const Tiquete = require('../models/Tiquete');

const getAll = async (req, res) =>{
    try {
        
        const response = await Tiquete.find();
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Tiquete.findById({ _id : id })

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validacion del tiquete
        const encontrarTiquete = await Tiquete.findOne({ codigoFactura: req.body.codigoFactura });
        if(encontrarTiquete){ return res.status(400).json({ msj: "El tiquete ya existe" }) }

        let tiquete = new Tiquete();
        
        tiquete.codigoFactura = req.body.codigoFactura;
        tiquete.copiaFactura = req.body.copiaFactura;
        tiquete.fecha = req.body.fecha;
        tiquete.suscripcion = req.body.suscripcion;

        tiquete =  await tiquete.save();

        res.status(200).send(tiquete);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let tiqueteEncontrado = await Tiquete.findById({ _id : id });
        if(!tiqueteEncontrado) { return res.status(404).json({mjs: "Tiquete no encontrado"}) }

        const {  codigoFactura, copiaFactura, fecha, suscripcion } = req.body;

        let tiqueteExiste = await Tiquete.findOne({ codigoFactura : codigoFactura, _id: { $ne : id } });
        if(tiqueteExiste) { return res.status(404).json({mjs: "El tiquete ya existe"}) }

        tiqueteEncontrado.codigoFactura = codigoFactura;
        tiqueteEncontrado.copiaFactura = copiaFactura;
        tiqueteEncontrado.fecha = fecha;
        tiqueteEncontrado.suscripcion = suscripcion;

        tiqueteEncontrado = await tiqueteEncontrado.save();

        res.status(202).send(tiqueteEncontrado);

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