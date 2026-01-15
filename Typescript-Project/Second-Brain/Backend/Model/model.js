const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    password: String
})

const contentSchema = new mongoose.Schema({
    type: String,
    link: String,
    title: String,
    tag: Array,
    konsaUser: Object
})

const userModel = mongoose.model("app-user", userSchema)
const contentModel = mongoose.model("user-content", contentSchema)

module.exports = {
    userModel,
    contentModel
}