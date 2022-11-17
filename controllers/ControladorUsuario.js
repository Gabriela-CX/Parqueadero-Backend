const Usuario = require('../models/Usuario');

const getAll = async (req, res) =>{
    try {
        
        const response = await Usuario.find();
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Usuario.findById({ _id : id })

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validacion de usuario
        const encontrarUsuario = await Usuario.findOne({ telefono: req.body.telefono });
        if(encontrarUsuario){ return res.status(400).json({ msj: "El usuario ya existe" }) }

        let usuario = new Usuario();
        
        usuario.nombre = req.body.nombre;
        usuario.apellidos = req.body.apellidos;
        usuario.telefono = req.body.telefono;
        usuario.email = req.body.email;
        

        usuario =  await usuario.save();

        res.status(200).send(usuario);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let usuarioEncontrado = await Usuario.findById({ _id : id });
        if(!usuarioEncontrado) { return res.status(404).json({mjs: "Usuario no encontrado"}) }

        const {  nombre, apellidos, telefono, email } = req.body;

        let usuarioExiste = await Usuario.findOne({ telefono : telefono, _id: { $ne : id } });
        if(usuarioExiste) { return res.status(404).json({mjs: "El usuario ya existe"}) }

        usuarioEncontrado.nombre = nombre;
        usuarioEncontrado.apellidos = apellidos;
        usuarioEncontrado.telefono = telefono;
        usuarioEncontrado.email = email;
        
        usuarioEncontrado = await usuarioEncontrado.save();

        res.status(202).send(usuarioEncontrado);

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