const Movie = require("../../models/movies");
const Constant = require("../../constants");
const movieDetails = require("../../responders/movieDetails");

module.exports = function(req, res) {
  if (req.params.id === undefined || req.params.castId === undefined) {
    res.status(400).send(Constant.BAD_PARAMS_REQUEST_MESSAGE);
  } else {
    Movie.findById(req.params.id, async function(err, movie) {
      if (err) {
        console.log(err);
        res.status(500).send(Constant.ERR_REQUEST_MESSAGE);
      } else {
        if (movie) {
          var castToUpdate = movie.cast.id(req.params.castId);

          if (req.body.name) {
            castToUpdate.name = req.body.name;
          }

          if (req.body.role) {
            castToUpdate.role = req.body.role;
          }

          var savedMovie = await movie.save();
          res.send({
            data: {
              movie: movieDetails(savedMovie)
            }
          });
        }
        res.status(404).send(Constant.NOT_FOUND_REQUEST_MESSAGE);
      }
    });
  }
};
