// declaración de paquetes a utilizar
require('dotenv').config(); //uso de variables de entorno
const express = require('express');
const helmet = require('helmet');
const APP_PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const MONGO_URI = " mongodb://admin:password@mongodb:27017/databaseName?authSource=admin";

// iniciación de express
const app = express();
app.use(helmet()); //uso de helmet para ocultar información de la API

// conexion a mongodb
const conecctionMongoDB = () => {
    return mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

// establecer formato json para la API
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ruta de prueba
app.get('/inicio', (req, res) => {
    return res.status(200).json({
        message: "API funcionando"
    })
});

//ruta 
app.use('/auth', require('./handlers/auth'));

//iniciar el servidor y probar la conexion mongoose
conecctionMongoDB().then(() => {
    app.listen(APP_PORT, () => {
        console.log(`Corriendo en el puerto ${APP_PORT}`);
    });
});