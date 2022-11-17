const Cliente = require('../models/Cliente');

const getAll = async (req, res) =>{
    try {
        
        const response = await Cliente.find();
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Cliente.findById({ _id : id })

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validacion de cliente
        const encontrarCliente = await Cliente.findOne({ pin: req.body.pin });
        if(encontrarCliente){ return res.status(400).json({ msj: "El cliente ya existe" }) }

        let cliente = new Cliente();
        
        cliente.pin = req.body.pin;
        cliente.usuario = req.body.usuario;

        cliente =  await cliente.save();

        res.status(200).send(cliente);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let clienteEncontrado = await Cliente.findById({ _id : id });
        if(!clienteEncontrado) { return res.status(404).json({mjs: "Cliente no encontrado"}) }

        const {  pin, usuario } = req.body;

        let clienteExiste = await Cliente.findOne({ pin : pin, _id: { $ne : id } });
        if(clienteExiste) { return res.status(404).json({mjs: "El cliente ya existe"}) }

        clienteEncontrado.pin = pin;
        clienteEncontrado.usuario = usuario;

        clienteEncontrado = await clienteEncontrado.save();

        res.status(202).send(clienteEncontrado);

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