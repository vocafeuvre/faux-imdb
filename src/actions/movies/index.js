const router = require("express").Router()

const getMovies = require("./getMovies")
const getMovieDetails = require("./getMovieDetails")

router.get("/movies", getMovies);
router.get("/movies/:id/details", getMovieDetails);

module.exports = router