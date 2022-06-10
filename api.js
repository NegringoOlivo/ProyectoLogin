
const mongoose = require("mongoose");
const Animals = require("./functions")
const {Auth, isAuthenticated} = require("./auth.controller");
const express = require("express");
const app = express();
 const port = 3000;

 app.use(express.json()); // middleware that allows working with text json for body

 mongoose.connect("mongodb+srv://nexus5:Josafat1984@cluster0.nuzrq.mongodb.net/bdAnimal?retryWrites=true&w=majority");



 app.get("/animal",isAuthenticated, Animals.list);
 app.post("/animal",isAuthenticated, Animals.create);
 app.put("/animal/:id",isAuthenticated, Animals.update);
 app.patch("/animal/:id",isAuthenticated, Animals.update);
 app.delete("/animal/:id",isAuthenticated, Animals.destroy);

 app.post("/login", Auth.login);
 app.post("/register", Auth.register);

app.use(express.static("app")); // middleware that allows working  whit folder that same global

app.get("/", (req, res) => {
    console.log(__dirname);// show  direction file
    res.sendFile(`${__dirname}/index.html`);
})

app.get("*", (req, res) =>{
    res.status(404).send("Esta pagina no existe...");
});


 app.listen(port, (req, res) =>{
     console.log("Iniciando Servidor Windows...");
 });


