const express = require("express");
const bcrypt = require("bcrypt");
//const expressJwt = require("express-jwt");
const { expressjwt: expressJwt } = require('express-jwt');
const jwt = require("jsonwebtoken");
const User = require("./user.model");

const validateJwt = expressJwt({secret: "mi-secreto", algorithms: ["HS256"]});
//const validateJwth = expressJwt({secret: "mi-secreto", algorithms: ["HS256"]});
const singToken = _id => jwt.sign({_id}, "mi-secreto");

findAndAssignUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(401).end();
        }
        req.user = user;
        next();
    }catch(e){
        next(e);
    }
}

const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser)
const Auth = {
    login: async (req, res) => {
        const {body} = req;
        console.log(body);
        try{
            const user = await User.findOne({email: body.email});
            if(!user){
                console.log("entra aqui 1");
                res.status(401).send("Usuario y/o contraseñas incorrectos");
            }else{
                console.log("entra aqui 2");
                const isMatch = await bcrypt.compare(body.password, user.password);
                if(!isMatch){
                    console.log("entra aqui 3");
                    const signed =  singToken(user._id);
                    res.status(200).send(signed);
                }else{
                    res.status(401).send("Usuario y/o contraseñas incorrectos");
                }
            }
        }catch(e){
            res.send(e.message)
        }
        
    },
    register: async (req, res) =>{
        const {body} = req;
        try{
            const isUser = await User.findOne({email: body.email});
            if(isUser){
                res.send("Usuario ya existe...");
            }else{
                const salt = await bcrypt.genSalt();
                const hashed = await bcrypt.hash(body.password, salt);
                const user = await User.create({email: body.email, password: hashed, salt});
                const signed = singToken(user._id);
                res.send(signed);
            }
        }catch(err){
            res.status(500).send(err.message);
        }
    },
}

module.exports = {Auth, isAuthenticated};