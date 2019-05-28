const Movie = require("../../models/movies");
const Constant = require("../../constants");
const movieStub = require("../../responders/movieStub");

module.exports = function(req, res) {
  const query = {};
  var page = 1;

  if (req.query.title) {
    query.title = new RegExp(req.query.title, "i");
  }

  if (req.query.tags) {
    query.tags = {
      $all: req.query.tags.split(",").map(function(val) {
        return val.trim();
      })
    };
  }

  if (req.query.page) {
    page = Number.parseInt(req.query.page);
  }

  Movie.find(query, function(err, movies) {
    if (err) {
      console.log(err);
      res.status(500).send(Constant.ERR_REQUEST_MESSAGE);
    } else {
      const pageStart = (page - 1) * Constant.PER_PAGE;
      const pageEnd = page * Constant.PER_PAGE;
      res.send({
        data: {
          movies: {
            items: movies
              .slice(pageStart, pageEnd)
              .map(function(val) {
                return movieStub(val);
              }),
            perPage: Constant.PER_PAGE,
            currentPage: page,
            total: movies.length
          }
        }
      });
    }
  });
};
