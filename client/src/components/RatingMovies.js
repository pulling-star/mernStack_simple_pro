import React, { useEffect, useState } from "react";
import { getMovies } from "../store/actions/movies";
import ItemShow from "./ItemShow.js";
import Spinner from "./Spinner.js";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";
const RatingMovies = ({
  choise,
  LatestMovies,
  RatingMovies,
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
      {RatingMovies.length > 0 ? (
        <ul className="homeLists">
          <li
            style={{
              display: "inline-block",
            }}
          >
            <ItemShow
              imgSrc={RatingMovies[0].posterurl}
              rating={RatingMovies[0].imdbRating}
              genres={RatingMovies[0].genres}
              title={
                RatingMovies[0].originalTitle
                  ? RatingMovies[0].originalTitle
                  : RatingMovies[0].title
              }
              year={RatingMovies[0].year}
              movie={RatingMovies[0]}
            />
          </li>
          <li
            style={{
              display: "inline-block",

              marginLeft: "10px",
            }}
          >
            <ItemShow
              imgSrc={RatingMovies[1].posterurl}
              rating={RatingMovies[1].imdbRating}
              genres={RatingMovies[1].genres}
              title={
                RatingMovies[1].originalTitle
                  ? RatingMovies[1].originalTitle
                  : RatingMovies[1].title
              }
              year={RatingMovies[1].year}
              movie={RatingMovies[1]}
            />
          </li>
          <li
            style={{
              display: "inline-block",

              marginLeft: "10px",
            }}
          >
            <ItemShow
              imgSrc={RatingMovies[2].posterurl}
              rating={RatingMovies[2].imdbRating}
              genres={RatingMovies[2].genres}
              title={
                RatingMovies[2].originalTitle
                  ? RatingMovies[2].originalTitle
                  : RatingMovies[2].title
              }
              year={RatingMovies[2].year}
              movie={RatingMovies[2]}
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
              imgSrc={RatingMovies[3].posterurl}
              rating={RatingMovies[3].imdbRating}
              genres={RatingMovies[3].genres}
              title={
                RatingMovies[3].originalTitle
                  ? RatingMovies[3].originalTitle
                  : RatingMovies[3].title
              }
              year={RatingMovies[3].year}
              movie={RatingMovies[3]}
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
    RatingMovies: state.movies.RatingMovies,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RatingMovies);
