const router = require("express").Router()

const getMovies = require("./getMovies")
const getMovieDetails = require("./getMovieDetails")
const addMovieCast = require("./addMovieCast")
const updateMovieCast = require("./updateMovieCast")

router.get("/movies", getMovies);
router.get("/movies/:id/details", getMovieDetails);
router.post("/movies/:id/cast", addMovieCast);
router.put("/movies/:id/cast/:castId", updateMovieCast);

module.exports = router