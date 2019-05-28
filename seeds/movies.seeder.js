var Seeder = require("mongoose-data-seed").Seeder;
var Movie = require("../src/models/movies");
var data = require("./data");

var MoviesSeeder = Seeder.extend({
  shouldRun: async function() {
    return true;
  },
  run: async function() {
    await Movie.deleteMany({});
    return await Movie.create(data);
  }
});

module.exports = MoviesSeeder;
