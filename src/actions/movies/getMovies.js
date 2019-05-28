const Movie = require("../../models/movies");
const Constant = require("../../constants");
const movieStub = require("../../responders/movieStub");

module.exports = function(req, res) {
    const query = {};

  if (req.query.title) {
    query.title = req.query.title;
  }

  if (req.query.tags) {
    query.tags = req.query.tags;
  }

  Movie.find(query, function(err, movies) {
    if (err) {
      console.log(err);
      res.status(500).send(Constant.ERR_REQUEST_MESSAGE);
    } else {
      res.send({
        data: {
          movies: {
            items: movies.slice(0, Constant.PER_PAGE).map(function(val) {
              return movieStub(val);
            }),
            perPage: Constant.PER_PAGE,
            currentPage: 1,
            total: movies.length
          }
        }
      });
    }
  });
}