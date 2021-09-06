import React, { useEffect } from "react";
import { getMovies } from "../store/actions/movies";
import ItemShow from "./ItemShow.js";
import Spinner from "./Spinner.js";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";
const LatestMovies = ({
  choise,
  LatestMovies,

  onGetMovies,
  clearMovies,
  loading,
}) => {
  useEffect(() => {
    onGetMovies(choise);
  }, [onGetMovies, choise]);

  return (
    <div>
      {LatestMovies.length > 0 ? (
        <div className="showSection" style={{ marginTop: "30px" }}>
          {LatestMovies
            ? LatestMovies.slice(0, 5).map((mov, index) => (
                <ItemShow
                  key={mov._id}
                  imgSrc={mov.posterurl}
                  rating={mov.imdbRating}
                  genres={mov.genres}
                  title={mov.originalTitle ? mov.originalTitle : mov.title}
                  year={mov.year}
                  movie={mov}
                />
              ))
            : null}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearMovies: () =>
      dispatch({
        type: actionTypes.CLEAR_MOVIES,
      }),
    onGetMovies: (choise) =>
      dispatch(
        getMovies(
          {
            searchTerm: "",
            orderedBy: choise,
            releaseYear: "All",
            rating: "All",
            genre: "All",
          },
          1,
          true
        )
      ),
  };
};

const mapStateToProps = (state) => {
  return {
    LatestMovies: state.movies.LatestMovies,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LatestMovies);
