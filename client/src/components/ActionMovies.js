import React, { useEffect } from "react";
import { getMovies } from "../store/actions/movies";
import ItemShow from "./ItemShow.js";
import Spinner from "./Spinner.js";
import { connect } from "react-redux";
const ActionMovies = ({
  choise,
  ActionMovies,

  onGetMovies,
  clearMovies,
  loading,
}) => {
  useEffect(() => {
    onGetMovies(choise);
  }, [onGetMovies, choise]);

  return (
    <div>
      {ActionMovies.length > 0 ? (
        <div className="showSection" style={{ marginTop: "30px" }}>
          {ActionMovies
            ? ActionMovies.slice(0, 5).map((mov, index) => (
                <ItemShow
                key={mov._id}
                imgSrc={mov.Poster}
                rating={mov.imdbRating}
                genres={mov.Genre}
                title={mov.Title}
                year={mov.Year}
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
    onGetMovies: (choise) =>
      dispatch(
        getMovies(
          {
            searchTerm: "",
            orderedBy: "Latest",
            releaseYear: "All",
            rating: "All",
            genre: "Action",
          },
          1,
          true
        )
      ),
  };
};

const mapStateToProps = (state) => {
  return {
    ActionMovies: state.movies.ActionMovies,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActionMovies);
