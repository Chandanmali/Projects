const express = require("express")
const app = express()
const PORT = 4000

app.get("/", (req, res) => {
    return res.send("Hello brain")
})

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})