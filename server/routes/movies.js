import Movie from "../models/Movie.js";
import express from "express";
import auth from "../middleware/auth.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

const setSortObject = (orderedBy) => {
  let sortObject;
  switch (orderedBy) {
    case "Latest":
      sortObject = { Year: -1 };
      break;
    case "Oldest":
      sortObject = { Year: 1 };
      break;
    case "Alphabetical":
      sortObject = { Title: 1 };
      break;
    case "Rating":
      sortObject = { imdbRating: -1 };
      break;
    default:
      sortObject = { Year: -1 };
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

//  @route  Get api/movies/FAVORITES
//  @desc   Get all movies that have specific title
//  @access Private
router.get("/substring/:substring", async (req, res) => {
  try {
    const pattern = req.params.substring;
    let movies = await Movie.find({
      Title: {
        $regex: pattern,
        $options: "i",
      },
    }).limit(5);

    if (movies) {
      res.json({ msg: "", movies, Mlength: movies.length });
    } else {
      res.json({ msg: "There is no movies with this id", Mlength: 0 });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//  @route  Get api/movies/FAVORITES
//  @desc   Get all movies that have specific title
//  @access Private
router.get("/favorites/:movies", async (req, res) => {
  try {
    const favorites = req.params.movies.split(",");

    let movies = await Movie.find({
      _id: { $in: favorites },
    });

    if (movies) {
      res.json({ msg: "", movies, Mlength: movies.length });
    } else {
      res.json({ msg: "There is no movies with this id", Mlength: 0 });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.post("", async (req, res) => {
  try {
   
    let {searchTerm, orderedBy, releaseYear, rating, genre,page_no}= req.body;
  
    const sortObject = setSortObject(orderedBy);
    const Mlength = await Movie.find({
      $and: [
        releaseYear?{
          $and: [
            { Year: { $gte: parseInt(releaseYear.split("-")[0]) } },
            { Year: { $lte: parseInt(releaseYear.split("-")[1]) } },
          ],
        }:{Year:{$exists: true}},
       rating? {
          imdbRating: { $gte: rating },
        }:{imdbRating:{$exists: true}},
        {
          Title: {$regex :  new RegExp(searchTerm,"i")} 
        },
       
        {
          Genre: {$regex : genre},
        },
      ],
    }).countDocuments();

    let movies = await Movie.find({
      $and: [
       releaseYear? {
          $and: [
            { Year:  { $gte: parseInt(releaseYear.split("-")[0]) } },
            { Year: { $lte: parseInt(releaseYear.split("-")[1]) } },
          ],
        }:{Year:{$exists: true}},
        rating?{ imdbRating: { $gte: rating } }:{imdbRating:{$exists: true}},
        { Title: {$regex :  new RegExp(searchTerm,"i")} },
       { Genre: {$regex : genre},}
      ],
    })
      .sort(sortObject)
      .skip((parseInt(page_no) - 1) * 20)
      .limit(20);

    if (movies.length > 0) {
      res.json({ msg: "", movies, Mlength });
    } else {
      res.json({ msg: "There is no movies with this title", Mlength: 0 });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//  @route  Get api/movies/title/:title
//  @desc   Get all movies that have specific title
//  @access Private
router.get("/title/:title/orderedBy/:orderedBy/:page_no", async (req, res) => {
  try {
    const orderedBy = req.params.orderedBy;

    const sortObject = setSortObject(orderedBy);
    let movies = await Movie.find({
        Title: {$regex :  new RegExp(req.params.title,"i")} 
    })  .sort(sortObject)
    .skip((parseInt(req.params.page_no) - 1) * 20)
    .limit(20);
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
      Genre: {$regex : req.params.genre},
    }).countDocuments();
    const movies = await Movie.find({ Genre: {$regex : req.params.genre}})
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
      console.log(req.params);
      const orderedBy = req.params.orderedBy;
      const sortObject = setSortObject(orderedBy);
      const Mlength = await Movie.find({
        imdbRating: { $gte: +req.params.rating },
      }).countDocuments();
      let movies = await Movie.find({
        imdbRating: { $gte: +req.params.rating },
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
        { Year: { $gte: parseInt(years[0]) } },
        { Year: { $lte: parseInt(years[1]) } },
      ],
    }).countDocuments();

    let movies = await Movie.find({
      $and: [
        { Year: { $gte: parseInt(years[0]) } },
        { Year: { $lte: parseInt(years[1]) } },
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
  "/title/:title/rating/:rating/year/:year/orderedBy/:orderedBy/:page_no",
  async (req, res) => {
    try {
      const orderedBy = req.params.orderedBy;
      const sortObject = setSortObject(orderedBy);

      const years = req.params.year.split("-");

      const Mlength = await Movie.find({
        $and: [
          {
            $and: [
              { Year: { $gte: parseInt(years[0]) } },
              { Year: { $lte: parseInt(years[1]) } },
            ],
          },
          {
            imdbRating: { $gte: req.params.rating },
          },
          {
            Title: {$regex :  new RegExp(req.params.title,"i")} 
          }
        ],
      }).countDocuments();

      let movies = await Movie.find({
        $and: [
          {
            $and: [
              { Year: { $gte: parseInt(years[0]) } },
              { Year: { $lte: parseInt(years[1]) } },
            ],
          },
          { imdbRating: { $gte: req.params.rating } },
          { Title: {$regex :  new RegExp(req.params.title,"i")} }
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
  "/title/:title/genre/:genre/year/:year/orderedBy/:orderedBy/:page_no",
  async (req, res) => {
    try {
      const orderedBy = req.params.orderedBy;
      const sortObject = setSortObject(orderedBy);

      const years = req.params.year.split("-");

      const Mlength = await Movie.find({
        $and: [
          {
            $and: [
              { Year: { $gte: parseInt(years[0]) } },
              { Year: { $lte: parseInt(years[1]) } },
            ],
          },
          {
            Genre:{$regex : req.params.genre},
          },
          { Title: {$regex :  new RegExp(req.params.title,"i")} }
        ],
      }).countDocuments();

      let movies = await Movie.find({
        $and: [
          {
            $and: [
              { Year: { $gte: parseInt(years[0]) } },
              { Year: { $lte: parseInt(years[1]) } },
            ],
          },
          {
            Genre:{$regex : req.params.genre},
          },
          { Title: {$regex :  new RegExp(req.params.title,"i")} }
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
  "/title/:title/genre/:genre/rating/:rating/orderedBy/:orderedBy/:page_no",
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
            Genre: {$regex : req.params.genre},
          },
          {  Title: {$regex :  new RegExp(req.params.title,"i")} }
        ],
      }).countDocuments();

      let movies = await Movie.find({
        $and: [
          {
            imdbRating: { $gte: req.params.rating },
          },
          {
            Genre: {$regex : req.params.genre},
          },
          { Title: {$regex :  new RegExp(req.params.title,"i")} }
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
  "/title/:title/genre/:genre/rating/:rating/year/:year/orderedBy/:orderedBy/:page_no",
  async (req, res) => {
    try {
      const orderedBy = req.params.orderedBy;
      const sortObject = setSortObject(orderedBy);
      const years = req.params.year.split("-");

      const Mlength = await Movie.find({
        $and: [
          {
            $and: [
              { Year: { $gte: parseInt(years[0]) } },
              { Year: { $lte: parseInt(years[1]) } },
            ],
          },
          {
            imdbRating: { $gte: req.params.rating },
          },
          {
            Genre: {$regex : req.params.genre}
          },
          {
            Title: {$regex :  new RegExp(req.params.title,"i")} 
          }
        ],
      }).countDocuments();

      let movies = await Movie.find({
        $and: [
          {
            $and: [
              { Year: { $gte: parseInt(years[0]) } },
              { Year: { $lte: parseInt(years[1]) } },
            ],
          },
          {
            imdbRating: { $gte: req.params.rating },
          },
          {
            Genre: {$regex : req.params.genre},
          },
          {
            Title: {$regex :  new RegExp(req.params.title,"i")} 
          }
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

//  @route  PUT api/movies/like/:id
//  @desc   Like a movie
//  @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "movie not found" });

    // Check if the movie has already been liked
    if (
      movie.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Movie already liked" });
    }
    movie.likes.unshift({ user: req.user.id });
    await movie.save();
    res.json(movie.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "movie not found" });
    res.status(500).send("Server error");
  }
});

//  @route  PUT api/movies/unlike/:id
//  @desc   Unlike a post
//  @access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "post not found" });

    // Check if the movie has already been liked
    if (
      movie.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Movie has not yet been liked" });
    }
    // Get removed Index
    const removedIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    movie.likes.splice(removedIndex, 1);
    await movie.save();
    res.json(movie.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "movie not found" });
    res.status(500).send("Server error");
  }
});
export default router;
