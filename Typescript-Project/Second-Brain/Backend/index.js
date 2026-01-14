require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const { userModel } = require("./Model/model")
const app = express()
const PORT = 4000
const jwt = require("jsonwebtoken")
const JWT_SECRETE = process.env.JWT_SECRETE
const {z} = require("zod")

mongoose.connect(process.env.Mongodb_URL).then(() => console.log("mongoDB connected successfully")).catch((err) => console.log("DB connection fail", err))

app.use(express.json())

app.post("/signup", async (req, res) => {

    //Input validation using zod schema
    const requireBody = z.object({
        //email: z.string().min(3).max(100).email(), // email is must be a string, min 3 characters, max 100 characters, and must be a valid email
        name: z.string().
        min(3, "name must have atleast 3 words").
        max(8, "name must have maximum 8 words"),

        password: z.string().
        min(8, "Password must have atleast 8 words").
        max(20, "Password must have maximum 20 words")
        .refine((val) => 
             /[A-Z]/.test(val) && /[^a-zA-Z0-9]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val), //special character
            {
                 message: "Password must contain at least one uppercase letter and one lowercase letter and one special character and numbers"
            }
        )
    })

    // Parse the request body using the requireBody.safeParse() method to validate the data format
    const parseDataWithSuccess = requireBody.safeParse(req.body)

    if(!parseDataWithSuccess.success)
    {
        return res.json({
            msg: "Incorrect data format",
            error: parseDataWithSuccess.error.issues.map(issue => issue.message)
        })
    }

    //Enter input in inputFields
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
            password: password
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