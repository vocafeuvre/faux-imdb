function movieDetails(val) {
  return {
    id: val._id,
    title: val.title,
    tags: val.tags,
    summary:
      val.summary,
    image: val.image,
    cast: val.cast.map(function(castVal) {
        return {
            id: castVal._id,
            movieId: val._id,
            name: castVal.name,
            role: castVal.role
        }
    })
  };
}

module.exports = movieDetails;
