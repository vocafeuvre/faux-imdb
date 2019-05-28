const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const movieActions = require("./actions/movies")

dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Handle the movies endpoint
app.use("/movies", movieActions)

// For pre-flight requests
app.options("*", cors());

module.exports = app;
