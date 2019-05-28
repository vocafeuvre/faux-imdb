const router = require("express").Router()

const getMovies = require("./getMovies")

router.get("/movies", getMovies);

module.exports = router