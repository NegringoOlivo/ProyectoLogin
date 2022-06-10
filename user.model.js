const mongoose =require("mongoose");
const Users = mongoose.model("User", {
    email: {type: String, required: true, minlenght: 5},
    password: {type: String, require: true},
    salt: {type: String, required: true},
})

module.exports = Users;