import Movie from "../models/Movie.js";
import express from "express";
const router = express.Router();

//  @route  Get api/movies
//  @desc   Get  movies
//  @access Private
router.get("/:page_no", async (req, res) => {
  try {
    const movies = await Movie.find()
      .sort({ year: -1 })
      .skip(parseInt(req.params.page_no) - 1)
      .limit(10);

    res.json(movies);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});
//  @route  Get api/movies/title/:title
//  @desc   Get all movies that have specific genre
//  @access Private
router.get("/title/:title", async (req, res) => {
  try {
    console.log(req.params.title);
    let movies = await Movie.find({ title: req.params.title });

    res.json(movies.length);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//  @route  Get api/movies/:genre
//  @desc   Get all movies that have specific genre
//  @access Private
router.get("/genre/:genre", async (req, res) => {
  try {
    console.log(req.params.genre);
    let movies = await Movie.find();

    movies = movies.filter((m) => {
      if (m.genres.includes(req.params.genre)) {
        return m;
      }
    });

    res.json(movies.length);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//  @route  Get api/movies/:rating
//  @desc   Get all movies that have  imdbRating greater then rate in the parameter
//  @access Private
router.get("/rating/:rating", async (req, res) => {
  try {
    console.log(req.params.rating);
    let movies = await Movie.find().sort({ imdbRating: 1 });

    movies = movies.filter((m) => {
      if (m.imdbRating >= req.params.rating) {
        return m;
      }
    });
    res.json(movies.length);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});
export default router;
