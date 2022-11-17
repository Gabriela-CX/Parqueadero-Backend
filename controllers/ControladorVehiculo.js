const Vehiculo = require('../models/Vehiculo');

const getAll = async (req, res) =>{
    try {
        
        const response = await Vehiculo.find();
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Vehiculo.findById({ _id : id })

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validacion del vehiculo
        const encontrarVehiculo = await Vehiculo.findOne({ nroPlaca: req.body.nroPlaca });
        if(encontrarVehiculo){ return res.status(400).json({ msj: "El vehiculo ya existe" }) }

        let vehiculo = new Vehiculo();
        
        vehiculo.nroPlaca = req.body.nroPlaca;
        vehiculo.modelo = req.body.modelo;
        vehiculo.horaEntrada = req.body.horaEntrada;
        vehiculo.horaSalida = req.body.horaSalida;
        vehiculo.tiquete = req.body.tiquete;
        vehiculo.celda = req.body.celda;
        vehiculo.usuario = req.body.usuario;

        vehiculo =  await vehiculo.save();

        res.status(200).send(vehiculo);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let vehiculoEncontrado = await Vehiculo.findById({ _id : id });
        if(!vehiculoEncontrado) { return res.status(404).json({mjs: "Vehiculo no encontrado"}) }

        const {  nroPlaca, modelo, horaEntrada, horaSalida, tiquete, celda, usuario } = req.body;

        let vehiculoExiste = await Vehiculo.findOne({ nroPlaca : nroPlaca, _id: { $ne : id } });
        if(vehiculoExiste) { return res.status(404).json({mjs: "El vehiculo ya existe"}) }

        vehiculoEncontrado.nroPlaca = nroPlaca;
        vehiculoEncontrado.modelo = modelo;
        vehiculoEncontrado.horaEntrada = horaEntrada;
        vehiculoEncontrado.horaSalida = horaSalida;
        vehiculoEncontrado.tiquete = tiquete;
        vehiculoEncontrado.celda = celda;
        vehiculoEncontrado.usuario = usuario;

        vehiculoEncontrado = await vehiculoEncontrado.save();

        res.status(202).send(vehiculoEncontrado);

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