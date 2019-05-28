require("./config");

var mongooseLib = require("mongoose");
var mongoURL = require("./database");
var Movies = require("./seeds/movies.seeder");

mongooseLib.Promise = global.Promise || Promise;

module.exports = {
  // Export the mongoose lib
  mongoose: mongooseLib,

  // Export the mongodb URL
  mongoURL: mongoURL,
  /*
    Seeders List
    ------
    order is important
  */
  seedersList: {
    Movies
  }
};
