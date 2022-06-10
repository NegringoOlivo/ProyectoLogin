
const mongoose = require("mongoose");

const bdAnimals = mongoose.model("bdAni", {
    nombre: {type: String, required: true, minLenght: 3},
    tipo: {type: String, required: true, minLenght: 3},
});


module.exports = bdAnimals;