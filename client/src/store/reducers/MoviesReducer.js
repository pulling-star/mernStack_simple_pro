import { updateObject } from "../utility";
import * as actions from "../actions/actions";
import * as actionTypes from "../actions/actionTypes";
const initialState = {
  searchTerm: "",
  rating: "All",
  genre: "All",
  releaseYear: "Latest",
  Movies: [],
  error: false,
  page_no: 1,
};

const setMov = (state, action) => {
  return updateObject(state, {
    Movies: action.Movies,
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
