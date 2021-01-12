import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  actors: { type: Array, required: true },
  imdbRating: Number,
  posterUrl: { type: String, required: true },
});
const Movie = mongoose.model("Movie", MovieSchema);
// Movie will be automatically converted into pluralized value ('Movies' or 'movies)
export default Movie;
