import MovieReducer from "./reducers/MoviesReducer";
import AuthReducer from "./reducers/AuthReducer";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
const composeEnhancers =
  process.env.Node_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const rootReducer = combineReducers({
  movies: MovieReducer,
  auth: AuthReducer,
});
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
