import mongoose from "mongoose";
//importamos mongoose para modelar la base de datos

const collection = "users"
//colleccion de usuarios con nombre users

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
})
//creamos el esquema con nombre,apellido, email, edad y contraseña

const userModel = mongoose.model(collection, schema)
//le pasamos el nombre de la collection al modelo de mongoose y el esquema
//esquema: como esta estructurada la data que solicitamos
//collection simplemente es el nombre del documento que almacenara dicho esquemas de data 

export default userModel