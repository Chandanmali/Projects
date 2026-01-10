const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    password: Number,
    email: {type: String, unique: true}
})

const userModel = mongoose.model("user", userSchema)

module.exports = {
    userModel
}