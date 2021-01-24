import Movie from "../models/Movie.js";
import express from "express";
const router = express.Router();

const setSortObject = (orderedBy) => {
  let sortObject;
  switch (orderedBy) {
    case "latest":
      sortObject = { year: -1 };
      break;
    case "oldest":
      sortObject = { year: 1 };
      break;
    case "alphabetical":
      sortObject = { title: 1 };
      break;
    case "rating":
      sortObject = { imdbRating: -1 };
      break;
    default:
      sortObject = { year: -1 };
      break;
  }
  return sortObject;
};
//  @route  Get api/movies
//  @desc   Get  all movies in specific order in limit 20 movies each time
//  @access Private
router.get("/orderedBy/:orderedBy/:page_no", async (req, res) => {
  try {
    const orderedBy = req.params.orderedBy;

    const sortObject = setSortObject(orderedBy);

    const Mlength = await Movie.find().countDocuments();
    const movies = await Movie.find()
      .sort(sortObject)
      .skip((parseInt(req.params.page_no) - 1) * 20)
      .limit(20);

    res.json({ msg: "", movies: movies, Mlength });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//  @route  Get api/movies/title/:title
//  @desc   Get all movies that have specific title
//  @access Private
router.get("/title/:title", async (req, res) => {
  try {
    let movies = await Movie.find({
      $or: [{ title: req.params.title }, { originalTitle: req.params.title }],
    });
    if (movies.length > 0) {
      res.json({ msg: "", movies, Mlength: 1 });
    } else {
      res.json({ msg: "There is no movies with this title", Mlength: 0 });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//  @route  Get api/movies/:genre
//  @desc   Get all movies that have specific genre
//  @access Private
router.get("/genre/:genre/orderedBy/:orderedBy/:page_no", async (req, res) => {
  try {
    const orderedBy = req.params.orderedBy;
    const sortObject = setSortObject(orderedBy);
    const Mlength = await Movie.find({
      genres: req.params.genre,
    }).countDocuments();
    const movies = await Movie.find({ genres: req.params.genre })
      .sort(sortObject)
      .skip((parseInt(req.params.page_no) - 1) * 20)
      .limit(20);

    res.json({ msg: "", movies, Mlength });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//  @route  Get api/movies/:rating
//  @desc   Get all movies that have  imdbRating greater then rate in the parameter
//  @access Private
router.get(
  "/rating/:rating/orderedBy/:orderedBy/:page_no",
  async (req, res) => {
    try {
      const orderedBy = req.params.orderedBy;
      const sortObject = setSortObject(orderedBy);
      const Mlength = await Movie.find({
        imdbRating: { $gte: req.params.rating },
      }).countDocuments();
      let movies = await Movie.find({
        imdbRating: { $gte: req.params.rating },
      })
        .sort(sortObject)
        .skip((parseInt(req.params.page_no) - 1) * 20)
        .limit(20);

      res.json({ msg: "", movies, Mlength });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

//  @route  Get api/movies/:year
//  @desc   Get all movies that have  imdbRating greater then rate in the parameter
//  @access Private
router.get("/year/:year/orderedBy/:orderedBy/:page_no", async (req, res) => {
  try {
    const orderedBy = req.params.orderedBy;
    const sortObject = setSortObject(orderedBy);

    const years = req.params.year.split("-");

    const Mlength = await Movie.find({
      $and: [
        { year: { $gte: parseInt(years[0]) } },
        { year: { $lte: parseInt(years[1]) } },
      ],
    }).countDocuments();

    let movies = await Movie.find({
      $and: [
        { year: { $gte: parseInt(years[0]) } },
        { year: { $lte: parseInt(years[1]) } },
      ],
    })
      .sort(sortObject)
      .skip((parseInt(req.params.page_no) - 1) * 20)
      .limit(20);

    res.json({ msg: "", movies, Mlength });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.get(
  "/rating/:rating/year/:year/orderedBy/:orderedBy/:page_no",
  async (req, res) => {
    try {
      const orderedBy = req.params.orderedBy;
      const sortObject = setSortObject(orderedBy);

      const years = req.params.year.split("-");

      const Mlength = await Movie.find({
        $and: [
          {
            $and: [
              { year: { $gte: parseInt(years[0]) } },
              { year: { $lte: parseInt(years[1]) } },
            ],
          },
          {
            imdbRating: { $gte: req.params.rating },
          },
        ],
      }).countDocuments();

      let movies = await Movie.find({
        $and: [
          {
            $and: [
              { year: { $gte: parseInt(years[0]) } },
              { year: { $lte: parseInt(years[1]) } },
            ],
          },
          { imdbRating: { $gte: req.params.rating } },
        ],
      })
        .sort(sortObject)
        .skip((parseInt(req.params.page_no) - 1) * 20)
        .limit(20);

      res.json({ msg: "", movies, Mlength });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

router.get(
  "/genre/:genre/year/:year/orderedBy/:orderedBy/:page_no",
  async (req, res) => {
    try {
      const orderedBy = req.params.orderedBy;
      const sortObject = setSortObject(orderedBy);

      const years = req.params.year.split("-");

      const Mlength = await Movie.find({
        $and: [
          {
            $and: [
              { year: { $gte: parseInt(years[0]) } },
              { year: { $lte: parseInt(years[1]) } },
            ],
          },
          {
            genres: req.params.genre,
          },
        ],
      }).countDocuments();

      let movies = await Movie.find({
        $and: [
          {
            $and: [
              { year: { $gte: parseInt(years[0]) } },
              { year: { $lte: parseInt(years[1]) } },
            ],
          },
          {
            genres: req.params.genre,
          },
        ],
      })
        .sort(sortObject)
        .skip((parseInt(req.params.page_no) - 1) * 20)
        .limit(20);

      res.json({ msg: "", movies, Mlength });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

router.get(
  "/genre/:genre/rating/:rating/orderedBy/:orderedBy/:page_no",
  async (req, res) => {
    try {
      const orderedBy = req.params.orderedBy;
      const sortObject = setSortObject(orderedBy);

      const Mlength = await Movie.find({
        $and: [
          {
            imdbRating: { $gte: req.params.rating },
          },
          {
            genres: req.params.genre,
          },
        ],
      }).countDocuments();

      let movies = await Movie.find({
        $and: [
          {
            imdbRating: { $gte: req.params.rating },
          },
          {
            genres: req.params.genre,
          },
        ],
      })
        .sort(sortObject)
        .skip((parseInt(req.params.page_no) - 1) * 20)
        .limit(20);

      res.json({ msg: "", movies, Mlength });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);
router.get(
  "/genre/:genre/rating/:rating/year/:year/orderedBy/:orderedBy/:page_no",
  async (req, res) => {
    try {
      const orderedBy = req.params.orderedBy;
      const sortObject = setSortObject(orderedBy);
      const years = req.params.year.split("-");

      const Mlength = await Movie.find({
        $and: [
          {
            $and: [
              { year: { $gte: parseInt(years[0]) } },
              { year: { $lte: parseInt(years[1]) } },
            ],
          },
          {
            imdbRating: { $gte: req.params.rating },
          },
          {
            genres: req.params.genre,
          },
        ],
      }).countDocuments();

      let movies = await Movie.find({
        $and: [
          {
            $and: [
              { year: { $gte: parseInt(years[0]) } },
              { year: { $lte: parseInt(years[1]) } },
            ],
          },
          {
            imdbRating: { $gte: req.params.rating },
          },
          {
            genres: req.params.genre,
          },
        ],
      })
        .sort(sortObject)
        .skip((parseInt(req.params.page_no) - 1) * 20)
        .limit(20);

      res.json({ msg: "", movies, Mlength });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);
export default router;
