const chai = require("chai");
const chaiHttp = require("chai-http");

require("../../config")
require("../../database")

const app = require("../../src/server");
const data = require("../../seeds/data");
const Constant = require("../../src/constants/index");
const Movie = require("../../src/models/movies");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Movie List", function() {
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

  it("should retrieve all movies in stub form", function(done) {
    chai
      .request(app)
      .get("/movies")
      .end(function(err, res) {
        if (err) {
          console.log(err);
          done(err);
        } else {
          // check if response body has valid structure
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("movies");
          expect(res.body.data.movies).to.have.property("items");
          expect(res.body.data.movies).to.have.property("currentPage");
          expect(res.body.data.movies).to.have.property("perPage");
          expect(res.body.data.movies).to.have.property("total");

          // check if movies items and pagination data are correct
          var movies = res.body.data.movies;
          expect(movies.perPage).to.be.equals(Constant.PER_PAGE);
          expect(movies.items.length).to.be.equals(Constant.PER_PAGE);
          expect(movies.total).to.be.equals(data.length);
          expect(movies.currentPage).to.be.equals(1);

          // Check if the returned items are indeed in the seeded data
          movies.items.forEach(function(movie) {
            var movieData = data.find(function(val) {
              return val.title === movie.title;
            });

            expect(movieData).to.exist;
            expect(movie).to.have.property("id")
            expect(movie).to.have.property("image")
            expect(movie).to.have.property("title")
            expect(movie.summary.length).to.be.lte(
              Constant.CHARS_IN_TRUNCATE_SUMMARY + 3
            ); // Add three because of ellipsis
            expect(movie.tags.length).to.be.lte(Constant.TAGS_PER_STUB);
            expect(movie.cast.length).to.be.lte(Constant.CAST_PER_STUB);
          });
        }
        done();
      });
  });

  it("should filter the list by title", function(done) {
    var titleFilter = data[0].title.split(" ")[0];
    chai
      .request(app)
      .get(`/movies?title=${titleFilter}`)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          done(err);
        } else {
          // check if response body has valid structure
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("movies");
          expect(res.body.data.movies).to.have.property("items");
          expect(res.body.data.movies).to.have.property("currentPage");
          expect(res.body.data.movies).to.have.property("perPage");
          expect(res.body.data.movies).to.have.property("total");

          // check if movies items and pagination data are correct
          var movies = res.body.data.movies;
          var filteredData = data.filter(function(val) {
            return val.title.toLowerCase().includes(titleFilter.toLowerCase());
          });

          expect(movies.perPage).to.be.equals(Constant.PER_PAGE);
          expect(movies.total).to.be.equals(filteredData.length);
          expect(movies.currentPage).to.be.equals(1);

          // Check if the returned items are indeed in the seeded data
          movies.items.forEach(function(movie) {
            let movieData = filteredData.find(function(val) {
              return val.title === movie.title;
            });

            expect(movieData).to.exist;
            expect(movie).to.have.property("id")
            expect(movie).to.have.property("image")
            expect(movie).to.have.property("title")
            expect(movie.summary.length).to.be.lte(
              Constant.CHARS_IN_TRUNCATE_SUMMARY + 3
            ); // Add three because of ellipsis
            expect(movie.tags.length).to.be.lte(Constant.TAGS_PER_STUB);
            expect(movie.cast.length).to.be.lte(Constant.CAST_PER_STUB);
          });
        }
        done();
      });
  });

  it("should filter the list by tags", function(done) {
    var tagFilter = data[0].tags[0];
    chai
      .request(app)
      .get(`/movies?tags=${tagFilter}`)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          done(err);
        } else {
          // check if response body has valid structure
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("movies");
          expect(res.body.data.movies).to.have.property("items");
          expect(res.body.data.movies).to.have.property("currentPage");
          expect(res.body.data.movies).to.have.property("perPage");
          expect(res.body.data.movies).to.have.property("total");

          // check if movies items and pagination data are correct
          var movies = res.body.data.movies;
          var filteredData = data.filter(function(val) {
            return val.tags.includes(tagFilter);
          });

          expect(movies.perPage).to.be.equals(Constant.PER_PAGE);
          expect(movies.total).to.be.equals(filteredData.length);
          expect(movies.currentPage).to.be.equals(1);

          // Check if the returned items are indeed in the seeded data
          movies.items.forEach(function(movie) {
            let movieData = filteredData.find(function(val) {
              return val.title === movie.title;
            });

            expect(movieData).to.exist;
            expect(movie).to.have.property("id")
            expect(movie).to.have.property("image")
            expect(movie).to.have.property("title")
            expect(movie.summary.length).to.be.lte(
              Constant.CHARS_IN_TRUNCATE_SUMMARY + 3
            ); // Add three because of ellipsis
            expect(movie.tags.length).to.be.lte(Constant.TAGS_PER_STUB);
            expect(movie.cast.length).to.be.lte(Constant.CAST_PER_STUB);
          });
        }
        done();
      });
  });
});
