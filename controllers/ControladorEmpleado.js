const Empleado = require('../models/Empleado');

const getAll = async (req, res) =>{
    try {
        
        const response = await Empleado.find();
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Empleado.findById({ _id : id })

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validacion de empleado
        const encontrarEmpleado = await Empleado.findOne({ pin: req.body.pin });
        if(encontrarEmpleado){ return res.status(400).json({ msj: "El empleado ya existe" }) }

        let empleado = new Empleado();
        
        empleado.pin = req.body.pin;
        empleado.usuario = req.body.usuario;

        empleado =  await empleado.save();

        res.status(200).send(empleado);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let empleadoEncontrado = await Empleado.findById({ _id : id });
        if(!empleadoEncontrado) { return res.status(404).json({mjs: "Empleado no encontrado"}) }

        const {  pin, usuario } = req.body;

        let empleadoExiste = await Empleado.findOne({ pin : pin, _id: { $ne : id } });
        if(empleadoExiste) { return res.status(404).json({mjs: "El empleado ya existe"}) }

        empleadoEncontrado.pin = pin;
        empleadoEncontrado.usuario = usuario;

        empleadoEncontrado = await empleadoEncontrado.save();

        res.status(202).send(empleadoEncontrado);

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