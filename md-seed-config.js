var mongooseLib = require('mongoose');
var Movies = require("./seeds/movies.seeder")

mongooseLib.Promise = global.Promise || Promise;

module.exports = {

  // Export the mongoose lib
  mongoose: mongooseLib,

  // Export the mongodb url
  mongoURL: "mongodb+srv://admin:13229899@faux-imdb-cluster-ewl8z.gcp.mongodb.net/fauximdb?retryWrites=true",

  /*
    Seeders List
    ------
    order is important
  */
  seedersList: {
    Movies
  }
};
