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
    console.log(queryParams);
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
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchMoviesFailed());
      });
  };
};
