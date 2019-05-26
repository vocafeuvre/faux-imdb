const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL)

const app = express()

app.use(cors())
app.use(bodyParser.json())

// For pre-flight requests
app.options("*", cors())

module.exports = {
    app
}