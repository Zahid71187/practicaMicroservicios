// instancia de paquetes a usar
const mongoose = require('mongoose');
const schema = mongoose.Schema;

//creación de esquema de usuario
const userSchema = new schema({
    nombre: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    correo: {
        type: String,
        index: {
            unique: true
        }
    },
    telefono: String,
    password: String,
    tipo: String
}, {
    timestamps: true,
});

//crear modelo de usuario 
const UserModel = new mongoose.model('User', userSchema);

//exportar schema y modelo
module.exports = {
    userSchema,
    UserModel
};