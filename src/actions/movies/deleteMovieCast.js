const Movie = require("../../models/movies");
const Constant = require("../../constants");
const movieDetails = require("../../responders/movieDetails");

module.exports = function(req, res) {
  if (req.params.id === undefined) {
    res.status(400).send(Constant.BAD_PARAMS_REQUEST_MESSAGE);
  } else {
    Movie.findById(req.params.id, async function(err, movie) {
      if (err) {
        console.log(err);
        res.status(500).send(Constant.ERR_REQUEST_MESSAGE);
      } else {
        if (movie) {
          movie.cast.id(req.params.castId).remove();
          var savedMovie = await movie.save();
          res.send({
            data: {
              movie: movieDetails(savedMovie)
            }
          });
        } else {
          res.status(404).send(Constant.NOT_FOUND_REQUEST_MESSAGE);
        }
      }
    });
  }
};
