const chai = require("chai");
const chaiHttp = require("chai-http");

require("../../config");
require("../../database");

const app = require("../../src/server");
const data = require("../../seeds/data");
const Movie = require("../../src/models/movies");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Movie Details", function() {
  before(function(done) {
    Movie.deleteMany({}, function(err) {
      if (err) {
        console.log(err);
        done(err);
      }

      Movie.create(data, function(err) {
        if (err) {
          console.log(err);
          done(err);
        }

        done();
      });
    });
  });

  it("should return all details of the movie", async function() {
    const movie = await Movie.findOne().then();
    chai
      .request(app)
      .get(`/movies/${movie._id}/details`)
      .end(function(err, res) {
        if (err) {
          console.log(err);
        }

        // check if response body has valid structure
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("movie");

        // check if returned data is correct
        var resMovie = res.body.data.movie;
        expect(resMovie.id).to.be.equals(movie._id.toString());
        expect(resMovie.title).to.be.equals(movie.title);
        expect(resMovie.summary).to.be.equals(movie.summary);
        expect(resMovie.image).to.be.equals(movie.image);

        resMovie.tags.forEach(function(val) {
          expect(movie.tags).to.include(val);
        });

        resMovie.cast.forEach(function(val) {
          const equivCast = movie.cast.id(val.id);

          expect(equivCast).to.exist;
          expect(val).to.have.property("id");
          expect(val).to.have.property("movieId");
          expect(val).to.have.property("name");
          expect(val).to.have.property("role");

          expect(val.movieId).to.be.equals(movie._id.toString());
          expect(val.name).to.be.equals(equivCast.name);
          expect(val.role).to.be.equals(equivCast.role);
        });
      });
  });
});
