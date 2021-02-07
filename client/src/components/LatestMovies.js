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
    <div
      style={{
        width: "70%",
        marginLeft: "15%",
        marginTop: "10px",

        borderTop: "1px solid gray",
      }}
    >
      {LatestMovies.length > 0 ? (
        <ul className="homeLists">
          <li
            style={{
              display: "inline-block",
            }}
          >
            <ItemShow
              imgSrc={LatestMovies[0].posterurl}
              rating={LatestMovies[0].imdbRating}
              genres={LatestMovies[0].genres}
              title={
                LatestMovies[0].originalTitle
                  ? LatestMovies[0].originalTitle
                  : LatestMovies[0].title
              }
              year={LatestMovies[0].year}
              movie={LatestMovies[0]}
            />
          </li>
          <li
            style={{
              display: "inline-block",

              marginLeft: "10px",
            }}
          >
            <ItemShow
              imgSrc={LatestMovies[1].posterurl}
              rating={LatestMovies[1].imdbRating}
              genres={LatestMovies[1].genres}
              title={
                LatestMovies[1].originalTitle
                  ? LatestMovies[1].originalTitle
                  : LatestMovies[1].title
              }
              year={LatestMovies[1].year}
              movie={LatestMovies[1]}
            />
          </li>
          <li
            style={{
              display: "inline-block",

              marginLeft: "10px",
            }}
          >
            <ItemShow
              imgSrc={LatestMovies[2].posterurl}
              rating={LatestMovies[2].imdbRating}
              genres={LatestMovies[2].genres}
              title={
                LatestMovies[2].originalTitle
                  ? LatestMovies[2].originalTitle
                  : LatestMovies[2].title
              }
              year={LatestMovies[2].year}
              movie={LatestMovies[2]}
            />{" "}
          </li>
          <li
            style={{
              display: "inline-block",

              marginLeft: "10px",
            }}
          >
            {" "}
            <ItemShow
              imgSrc={LatestMovies[3].posterurl}
              rating={LatestMovies[3].imdbRating}
              genres={LatestMovies[3].genres}
              title={
                LatestMovies[3].originalTitle
                  ? LatestMovies[3].originalTitle
                  : LatestMovies[3].title
              }
              year={LatestMovies[3].year}
              movie={LatestMovies[3]}
            />
          </li>
        </ul>
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
