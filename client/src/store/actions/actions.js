import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const setMovies = (Movies) => {
  return {
    type: actionTypes.SET_MOVIES,
    Movies: Movies,
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

    axios
      .get("/api/movies/" + queryParams)
      .then((res) => {
        dispatch(setMovies(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchMoviesFailed());
      });
  };
};
