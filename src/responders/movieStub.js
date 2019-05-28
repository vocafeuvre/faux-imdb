const Constant = require("../constants");

function movieStub(val) {
  return {
    id: val._id,
    title: val.title,
    tags: val.tags.slice(0, Constant.TAGS_PER_STUB),
    summary:
      val.summary.substring(0, Constant.CHARS_IN_TRUNCATE_SUMMARY) + "...",
    image: val.image,
    cast: val.cast.slice(0, Constant.CAST_PER_STUB).map(function(castVal) {
      return castVal.name;
    })
  };
}

module.exports = movieStub;
