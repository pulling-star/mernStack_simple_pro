import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const setMovies = (Movies, reqs) => {
  return {
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
};
export const fetchMoviesFailed = () => {
  return {
    type: actionTypes.FETCH_MOVIES_FAILED,
  };
};
export const getMovies = (
  { searchTerm, orderedBy, releaseYear, rating, genre },
  page_no
) => {
  return (dispatch) => {
    let queryParams;
    if (
      searchTerm === "" &&
      rating === "All" &&
      genre === "All" &&
      releaseYear === "All" &&
      orderedBy === "Latest"
    ) {
      queryParams = page_no;
    }
    // const queryParams =
    //   "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
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
        dispatch(setMovies(res.data, searchReqs));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchMoviesFailed());
      });
  };
};
