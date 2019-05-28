const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    lowercase: true
  },
  summary: {
    type: String
  },
  image: {
    type: String
  },
  cast: [{
    name: String,
    role: String
  }],
  createdAt: {
      type: Date
  },
  updatedAt: {
      type: Date
  },
  deletedAt: {
      type: Date
  }
});

MovieSchema.pre("save", function(next) {
    var now = Date.now()

    if (!this.createdAt) {
        this.createdAt = now
    }

    this.updatedAt = now

    next()
});

module.exports = mongoose.model("Movie", MovieSchema);
