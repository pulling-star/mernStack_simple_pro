import { updateObject } from "../utility";

import * as actionTypes from "../actions/actionTypes";
const initialState = {
  searchTerm: "",
  rating: "All",
  genre: "All",
  releaseYear: "All",
  orderedBy: "Latest",
  Movies: [],
  Mlength: 0,
  error: false,
  page_no: 1,
};

const setMov = (state, action) => {
  console.log(action.Movies);
  return updateObject(state, {
    Movies: action.Movies,
    Mlength: action.Mlength,

    searchTerm: action.searchTerm,
    rating: action.rating,
    genre: action.genre,
    releaseYear: action.releaseYear,
    orderedBy: action.orderedBy,
    page_no: action.page_no,
    error: false,
  });
};
const fetchMovFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MOVIES:
      return setMov(state, action);
    case actionTypes.FETCH_MOVIES_FAILED:
      return fetchMovFailed(state, action);
    default:
      return state;
  }
};
export default reducer;
