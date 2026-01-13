require("dotenv").config()
const express = require("express")
const { default: mongoose } = require("mongoose")
const { userModel } = require("./Model/model")
const app = express()
const PORT = 4000
const jwt = require("jsonwebtoken")
const JWT_SECRETE = process.env.JWT_SECRETE

mongoose.connect(process.env.Mongodb_URL).then(() => console.log("mongoDB connected successfully")).catch((err) => console.log("DB connection fail", err))

app.use(express.json())

app.post("/signup", async (req, res) => {
    const name = req.body.name
    const password = req.body.password

    try {

        //input field required
        if (!name || !password) {
            res.status(411).json({ msg: "Please enter required fields" })
            return

        }

        //If user already registered
        const exitingUser = await userModel.findOne({
            name: name,
        })

        if (exitingUser) {
            res.status(403).json({ msg: "User Already registered" })
            return

        }

        //signup done
        const response = await userModel.create({
            name: name,
            password: password
        })
        if (response) {
            return res.status(200).json({ msg: "User successfully registered" })
        }
    }

    //suppose server not responding or db not connected
    catch (err) {
        return res.status(500).json({ msg: "Server Error" }, err)
    }

})

app.post("/login", async (req, res) => {

    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
        return res.status(411).json({ msg: "Please enter required fields" })
    }

    try {

        const response = await userModel.findOne({
            name: name,
            password: password
        })

        if (response) {
            const token = jwt.sign({
                userId: response._id
            }, JWT_SECRETE)

            return res.status(200).json({ token: token })
        }
        else{
            return res.status(403).json({ msg: "Please enter valid name and password" })
        }

    }
    catch (err) {
       return res.status(500).json({ msg: "Server error" })
    }

})

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})