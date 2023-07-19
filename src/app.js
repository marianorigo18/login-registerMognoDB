import express from "express";
//para crear un servidor
import session from "express-session";
//para capturar las sesiones y almacenarlas
import MongoStore from "connect-mongo";
//para conectarse a la base de datos de mongodb
import __dirname from "./utils.js";
// es una variable que representa una ruta absoluta del directorion de un archivo
import mongoose from "mongoose";
//importamos mongoose para modelar la base de datos
import Handlebars from "express-handlebars";
//handlebars, nuestra plantilla para mostrar data
import sessionRouter from "./routes/session.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

const connection = mongoose.connect("mongodb+srv://marianowagnerrigo18:Marawarigo3360@cluster0.xjgkqac.mongodb.net/",
{useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.static(__dirname+"/public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion de handlebars
app.engine("handlebars", Handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");  

app.use(session({
    store: new MongoStore({
        mongoUrl: "mongodb+srv://marianowagnerrigo18:Marawarigo3360@cluster0.xjgkqac.mongodb.net/",
        ttl: 15,
    }),
    secret: "mongoSecret",
    resave: true,
    saveUninitialized: true
}))
//este codigo nos sirve solo para guardar las sessiones 

app.use("/", viewsRouter)
app.use("/api/sessions", sessionRouter)

app.listen(8082, ()=>{
    console.log("listen on port 8082")
})