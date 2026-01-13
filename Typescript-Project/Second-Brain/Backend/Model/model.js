const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    password: Number
})

const userModel = mongoose.model("app-user", userSchema)

module.exports = {
    userModel
}