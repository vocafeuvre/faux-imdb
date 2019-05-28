const Movie = require("../../models/movies");
const Constant = require("../../constants");
const movieDetails = require("../../responders/movieDetails");

module.exports = function(req, res) {
  const id = req.params.id.trim();

  if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err);
        res.status(500).send(Constant.ERR_REQUEST_MESSAGE);
      } else {
        res.send({
          data: {
            movie: movieDetails(movie)
          }
        });
      }
    });
  } else {
    res.status(400).send(Constant.BAD_PARAMS_REQUEST_MESSAGE);
  }
};
