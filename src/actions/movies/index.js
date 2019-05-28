const router = require("express").Router()

const getMovies = require("./getMovies")
const getMovieDetails = require("./getMovieDetails")
const addMovieCast = require("./addMovieCast")
const updateMovieCast = require("./updateMovieCast")
const deleteMovieCast = require("./deleteMovieCast")

router.get("/", getMovies);
router.get("/:id/details", getMovieDetails);
router.post("/:id/cast", addMovieCast);
router.put("/:id/cast/:castId", updateMovieCast);
router.delete("/:id/cast/:castId", deleteMovieCast);

module.exports = router