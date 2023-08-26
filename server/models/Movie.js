import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },

  Title: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  Language: {
    type: String,
    required: true,
  },
  // ratings: Array,
  // poster: String,
  contentRating: String,
  duration: String,
  release_date: {
    type: String,
    required: true,
  },
  averageRating: Number,
  originalTitle: {
    type: String,
  },
  Plot: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  Actors: { type: String, required: true },
  imdbRating: Number,
  Poster: {
    type: String,
    required: true,
  },
});
const   Movie = mongoose.model("Film", MovieSchema);
// Movie will be automatically converted into pluralized value ('Movies' or 'movies)
export default Movie;
