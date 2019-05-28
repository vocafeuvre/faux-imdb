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

  it("should add to a cast of a movie", function(done) {
    Movie.findOne().then(function(movie) {
      const newCast = {
        name: "Test Foo",
        role: "Bar"
      };
      chai
        .request(app)
        .post(`/movies/${movie._id}/cast`)
        .send(newCast)
        .end(function(err, res) {
          if (err) {
            console.log(err);
            done(err);
          }

          // check if response body has valid structure
          expect(res.status).to.be.equals(201);
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

          const oldCastIds = movie.cast.map(function(val) {
            return val._id.toString();
          });
          var resNewCast = resMovie.cast.filter(function(val) {
            return !oldCastIds.includes(val.id);
          });

          expect(resNewCast.length).to.be.equals(1); // only one should've been added
          expect(resNewCast[0].movieId).to.be.equals(movie._id.toString());
          expect(resNewCast[0].name).to.be.equals(newCast.name);
          expect(resNewCast[0].role).to.be.equals(newCast.role);

          resMovie.cast.forEach(function(val) {
            if (val.id !== resNewCast[0].id) {
              const equivCast = movie.cast.id(val.id);

              expect(equivCast).to.exist;
              expect(val).to.have.property("id");

              expect(val.movieId).to.be.equals(movie._id.toString());
              expect(val.name).to.be.equals(equivCast.name);
              expect(val.role).to.be.equals(equivCast.role);
            }
          });
          done();
        });
    });
  });

  it("should update a cast of a movie", function(done) {
    Movie.findOne().then(function(movie) {
      const castIdToUpdate = movie.cast[0]._id;
      const updatedCast = {
        name: "Test Foo",
        role: "Bar"
      };
      chai
        .request(app)
        .put(`/movies/${movie._id}/cast/${castIdToUpdate}`)
        .send(updatedCast)
        .end(function(err, res) {
          if (err) {
            console.log(err);
            done(err);
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

          var resUpdatedCast = resMovie.cast.find(function(val) {
            return val.id === castIdToUpdate.toString();
          });

          expect(resUpdatedCast).to.exist;
          expect(resUpdatedCast.movieId).to.be.equals(movie._id.toString());
          expect(resUpdatedCast.name).to.be.equals(updatedCast.name);
          expect(resUpdatedCast.role).to.be.equals(updatedCast.role);
          expect(resMovie.cast.length).to.be.equals(movie.cast.length);

          resMovie.cast.forEach(function(val) {
            if (val.id !== castIdToUpdate.toString()) {
              const equivCast = movie.cast.id(val.id);

              expect(equivCast).to.exist;
              expect(val).to.have.property("id");

              expect(val.movieId).to.be.equals(movie._id.toString());
              expect(val.name).to.be.equals(equivCast.name);
              expect(val.role).to.be.equals(equivCast.role);
            }
          });
          done();
        });
    });
  });

  it("should delete a cast of a movie", function(done) {
    Movie.findOne().then(function(movie) {
      const castIdToDelete = movie.cast[0]._id;
      chai
        .request(app)
        .delete(`/movies/${movie._id}/cast/${castIdToDelete}`)
        .end(function(err, res) {
          if (err) {
            console.log(err);
            done(err);
          }

          // check if response body has valid structure
          expect(res.status).to.be.equals(204);
          Movie.findById(movie._id).then(function(savedMovie) {
            const castNoMore = savedMovie.cast.id(castIdToDelete);
            expect(castNoMore).to.not.exist;
            done();
          });
        });
    });
  });
});
