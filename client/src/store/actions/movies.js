import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const setMovies = (Movies, reqs) => {
  if (Movies.msg === "") {
    return {
      msg: "",
      type: actionTypes.SET_MOVIES,
      Movies: Movies.movies,
      Mlength: Movies.Mlength,
      searchTerm: reqs.searchTerm,
      rating: reqs.rating,
      genre: reqs.genre,
      releaseYear: reqs.releaseYear,
      orderedBy: reqs.orderedBy,
      page_no: reqs.page_no,
    };
  } else {
    return {
      type: actionTypes.SET_MOVIES,
      Movies: [],
      msg: Movies.msg,
      Mlength: Movies.Mlength,
      searchTerm: reqs.searchTerm,
      rating: reqs.rating,
      genre: reqs.genre,
      releaseYear: reqs.releaseYear,
      orderedBy: reqs.orderedBy,
      page_no: reqs.page_no,
    };
  }
};

export const setRatingMovies = (Movies, reqs) => {
  if (Movies.msg === "") {
    return {
      msg: "",
      type: actionTypes.SET_RATING_MOVIES,
      RatingMovies: Movies.movies,
    };
  }
};
export const setActionMovies = (Movies, reqs) => {
  if (Movies.msg === "") {
    return {
      msg: "",
      type: actionTypes.SET_ACTION_MOVIES,
      ActionMovies: Movies.movies,
    };
  }
};

export const setLatestMovies = (Movies, reqs) => {
  if (Movies.msg === "") {
    return {
      msg: "",
      type: actionTypes.SET_LATEST_MOVIES,
      LatestMovies: Movies.movies,
    };
  }
};
export const fetchMoviesFailed = () => {
  return {
    type: actionTypes.FETCH_MOVIES_FAILED,
  };
};
export const getAMovie = (title) => {
  return (dispatch) => {
    axios
      .get("/api/movies/title/" + title)
      .then((res) => {
        dispatch(setMovies(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchMoviesFailed());
      });
  };
};
export const getMovies = (
  { searchTerm, orderedBy, releaseYear, rating, genre },
  page_no,
  HomeMovies
) => {
  return (dispatch) => {
    let queryParams;

    if (searchTerm !== "") {
      queryParams = "title/" + searchTerm;
    } else if (rating === "All" && genre === "All" && releaseYear === "All") {
      queryParams = "orderedBy/" + orderedBy + "/" + page_no;
    } else if (rating === "All" && releaseYear === "All") {
      queryParams =
        "genre/" + genre + "/orderedBy/" + orderedBy + "/" + page_no;
    } else if (genre === "All" && releaseYear === "All") {
      queryParams =
        "rating/" + rating + "/orderedBy/" + orderedBy + "/" + page_no;
    } else if (genre === "All" && rating === "All") {
      queryParams =
        "year/" + releaseYear + "/orderedBy/" + orderedBy + "/" + page_no;
    } else if (genre === "All") {
      queryParams =
        "rating/" +
        rating +
        "/year/" +
        releaseYear +
        "/orderedBy/" +
        orderedBy +
        "/" +
        page_no;
    } else if (rating === "All") {
      queryParams =
        "genre/" +
        genre +
        "/year/" +
        releaseYear +
        "/orderedBy/" +
        orderedBy +
        "/" +
        page_no;
    } else if (releaseYear === "All") {
      queryParams =
        "genre/" +
        genre +
        "/rating/" +
        rating +
        "/orderedBy/" +
        orderedBy +
        "/" +
        page_no;
    } else {
      queryParams =
        "genre/" +
        genre +
        "/rating/" +
        rating +
        "/year/" +
        releaseYear +
        "/orderedBy/" +
        orderedBy +
        "/" +
        page_no;
    }

    const searchReqs = {
      searchTerm,
      orderedBy,
      releaseYear,
      rating,
      genre,
      page_no,
    };

    axios
      .get("/api/movies/" + queryParams)
      .then((res) => {
        if (HomeMovies) {
          if (orderedBy === "rating") {
            dispatch(setRatingMovies(res.data, searchReqs));
          }
          if (orderedBy === "year") {
            dispatch(setLatestMovies(res.data, searchReqs));
          }
          if (genre === "Action") {
            dispatch(setActionMovies(res.data, searchReqs));
          }
        } else {
          dispatch(setMovies(res.data, searchReqs));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchMoviesFailed());
      });
  };
};

//get Favorites
export const getFavorites = (movies) => async (dispatch) => {
  try {
    movies = movies.map((m) => m.movieId);

    const res = await axios.get(`/api/movies/favorites/${movies}`);
    console.log(res.data);
    dispatch({
      type: actionTypes.GET_FAVORITES,
      payload: res.data.movies,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FAVORITES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//quick search
export const quickSearch = (substring) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.QUICK_SEARCH_START,
    });

    const res = await axios.get(`/api/movies/substring/${substring}`);
    console.log(res.data);
    dispatch({
      type: actionTypes.QUICK_SEARCH,
      payload: res.data.movies,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.QUICK_SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/movies/like/${id}`);

    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: actionTypes.MOVIE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/movies/unlike/${id}`);

    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: actionTypes.MOVIE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
