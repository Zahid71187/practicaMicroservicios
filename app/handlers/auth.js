// instancias de paquetes a utilizar
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //paquete para encriptar y desencriptar
const validator = require('validatorjs'); //validar datos
const { UserModel } = require('../models/user');
const jsontoken = require('jsonwebtoken');

//rutas

//registrarse en el sistema
router.post('/register', async(req, res) => {
    //asignar valores
    let {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        telefono,
        password,
        tipo
    } = req.body;

    //validar valores
    const validation = new validator(req.body, {
        nombre: 'required',
        apellidoPaterno: 'required',
        apellidoMaterno: 'required',
        correo: 'required',
        telefono: 'required',
        password: 'required',
        tipo: 'required'
    });

    //comprobar validación
    if (!validation.passes()) {
        const { errors } = validation.errors;
        return res.status(400).json({
            message: errors
        });
    }

    //buscar si ya existe el correo ingresado en MongoDB
    let user = await UserModel.findOne({ correo });

    //validar si encontró el correo 
    if (user) {
        return res.status(400).json({
            message: "Este correo ya ha sido registrado",
        });
    }

    //encriptar la password
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    //generar el modelo a guardar
    user = await UserModel({
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        telefono,
        password,
        tipo
    });

    //guardar modelo 
    await user.save();

    return res.json({
        message: "Registrado correctamente",
    });
});

//login
router.post('/login', async(req, res) => {
    const { correo, password } = req.body;
    const validation = new validator(req.body, {
        correo: "required",
        password: "required"
    });

    if (!validation.passes()) {
        const { errors } = validation.errors;
        return res.status(400).json({
            message: errors,
        });
    }

    const user = await UserModel.findOne({ correo });

    //validar si el usuario existe
    if (!user) {
        return res.status(400).json({
            message: 'Unauthorized',
        });
    }

    //validar el password 
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            message: 'Unauthorized',
        });
    }

    //crear token
    const token = jsontoken.sign({
            iss: 'practica2',
            id: user.id
        },
        'practica microservicios', {
            expiresIn: 180000
        }
    );
    return res.json({
        token: token,
        nombre: user.nombre,
    });
});

//exportar rutas
module.exports = router;