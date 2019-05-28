const router = require("express").Router()

const getMovies = require("./getMovies")
const getMovieDetails = require("./getMovieDetails")
const addMovieCast = require("./addMovieCast")

router.get("/movies", getMovies);
router.get("/movies/:id/details", getMovieDetails);
router.post("/movies/:id/cast", addMovieCast);

module.exports = router