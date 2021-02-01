import { updateObject } from "../utility";

import * as actionTypes from "../actions/actionTypes";
const initialState = {
  moviesQuickSearch: [],
  searchTerm: "",
  SpecificMovies: [],
  rating: "All",
  genre: "All",
  releaseYear: "All",
  orderedBy: "Latest",
  Movies: [],
  Mlength: 0,
  error: false,
  page_no: 1,
  msg: "",
  loading: true,
};
const getAMovie = (state, action) => {
  return updateObject(state, {
    SpecificMovies: action.payload,
    loading: false,
  });
};
const setMov = (state, action) => {
  console.log(action.Movies);
  return updateObject(state, {
    Movies: action.Movies,
    Mlength: action.Mlength,
    msg: action.msg,
    searchTerm: action.searchTerm,
    rating: action.rating,
    genre: action.genre,
    releaseYear: action.releaseYear,
    orderedBy: action.orderedBy,
    page_no: action.page_no,
    error: false,
    loading: false,
  });
};
const fetchMovFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MOVIES:
      return setMov(state, action);
    case actionTypes.GET_FAVORITES:
      return getAMovie(state, action);
    case actionTypes.FETCH_MOVIES_FAILED:
      return fetchMovFailed(state, action);
    case actionTypes.QUICK_SEARCH_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.QUICK_SEARCH:
      return {
        ...state,
        moviesQuickSearch: action.payload,
        loading: false,
      };
    case actionTypes.QUICK_SEARCH_ERROR:
      return {
        ...state,
        error: action.msg,
        loading: false,
      };
    case actionTypes.FAVORITES_ERROR:
      return {
        ...state,
        loading: false,
        err: action.msg,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        loading: false,
        SpecificMovies: [],
        Movies: [],
        Mlength: 0,
        error: false,
        page_no: 1,
        msg: "",
      };
    default:
      return state;
  }
};
export default reducer;
