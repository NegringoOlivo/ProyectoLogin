
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://nexus5:Josafat1984@cluster0.nuzrq.mongodb.net/bdWindows?retryWrites=true&w=majority");


const bdWindo = mongoose.model("bdWindows11", {
    nombre: String,
    edad: Number,
    color: String
});

const creE = async () =>{
    const nuevoE = new bdWindo({nombre: "Plus" , edad: 500, color: "verde"});
    const saveE = await nuevoE.save();
    console.log(saveE);
}

creE();

const getE = async () =>{
    const obtieneE =await bdWindo.find();
    console.log(obtieneE);
}

//getE();


const getId = async () =>{
    const obtieneE =await bdWindo.findOne({edad: 5});
    console.log(obtieneE);

}

//getId();

const actE = async () =>{
    const obtieneE =await bdWindo.findOne({edad: 5});
    obtieneE.edad = 100;
    const save = await obtieneE.save();
    console.log(save);
}

//actE();



const delE = async () =>{
    const obtieneE =await bdWindo.findOne({edad: 100});
    obtieneE.remove();
    await obtieneE.save();
    getE();
}

//delE();