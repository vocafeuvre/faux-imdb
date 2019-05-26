var Seeder = require("mongoose-data-seed").Seeder;
var Movie = require("../src/models/movies");
var data = require("./data")

var MoviesSeeder = Seeder.extend({
  shouldRun: async function() {
    return await Movie.countDocuments()
      .exec()
      .then(count => { return count === 0 });
  },
  run: async function() {
    return await Movie.create(data);
  }
});

module.exports = MoviesSeeder;
