import { Router } from "express";
import userModel from "../models/User.model.js";

const router = Router();

router.post("/register", async (req, res) =>{
    const {first_name, last_name, email, age, password} = req.body;
    const exist = await userModel.findOne({email})

    if(exist) return res.status(400).send({status: "error", message: "usuario ya registrado"})

    let result = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password
    })
    res.send({status: "succes", message: "usuario registrado"})
})
//esta ruta capturara los datos del formulario de register

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email: email, password: password})
    if(!user) return res.redirect("/api/login")
    req.session.user = {
        name: user.first_name + user.last_name,
        email: user.email,
        age: user.age
    }
    res.send({status: "succes", message: req.session.user})
})
//ruta para loguearse por si la ruta se pierde

export default router;