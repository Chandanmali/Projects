require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const { userModel } = require("./Model/model.js")
const app = express()
const PORT = 3000
const jwt = require("jsonwebtoken")
const JWT_SECRETE = process.env.JWT_SECRETE
const cors = require("cors")
const MONGODB_URL = process.env.MONGODB_URL

app.use(cors())
app.use(express.json())  //middleware

mongoose.connect(MONGODB_URL, {
   maxPoolSize: 10,
   serverSelectionTimeoutMS: 5000,
   socketTimeoutMS: 45000,
}).then(() => console.log("Mongodb conneted successfully")).catch((err) => console.log("mongoDB connection faild", err))

mongoose.connection.on("connected", () => {
   console.log("MongoDB connected event");
});

mongoose.connection.on("error", (err) => {
   console.error("MongoDB error:", err);
});

mongoose.connection.on("disconnected", () => {
   console.log("MongoDB disconnected");
});

app.get("/health", (req, res) => {
   res.status(200).send("OK");
});


app.post('/signup', async (req, res) => {
   const name = req.body.name
   const password = req.body.password
   const email = req.body.email

   if (!name || !password || !email) {
      return res.status(400).json({ msg: "required all fields" })
   }

   const exisingUser = await userModel.findOne({
      email: email
   })

   if (exisingUser) {
      return res.status(409).json({ msg: "already registered, Please login" })
   }

   await userModel.create({
      name: name,
      password: password,
      email: email
   })

   res.json({ msg: "signup done successfully" })
})

app.post("/login", async (req, res) => {
   try {
      const name = req.body.name
      const password = req.body.password

      const response = await userModel.findOne({
         name: name,
         password: password
      })
      console.log(response)

      const token = jwt.sign({
         userId: response._id
      }, JWT_SECRETE)

      return res.status(200).json({ token: token })
   }

   catch (err) {
      return res.status(400).json({ msg: "Invalid user" })
   }

})



app.listen(PORT, () => {
   console.log("server running at ", PORT)
})