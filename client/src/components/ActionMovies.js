import React, { useEffect, useState } from "react";
import { getMovies } from "../store/actions/movies";
import ItemShow from "./ItemShow.js";
import Spinner from "./Spinner.js";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";
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
    <div
      style={{
        width: "70%",
        marginLeft: "15%",
        marginTop: "10px",

        borderTop: "1px solid gray",
      }}
    >
      {ActionMovies.length > 0 ? (
        <ul className="homeLists">
          <li
            style={{
              display: "inline-block",
            }}
          >
            <ItemShow
              imgSrc={ActionMovies[0].posterurl}
              rating={ActionMovies[0].imdbRating}
              genres={ActionMovies[0].genres}
              title={
                ActionMovies[0].originalTitle
                  ? ActionMovies[0].originalTitle
                  : ActionMovies[0].title
              }
              year={ActionMovies[0].year}
              movie={ActionMovies[0]}
            />
          </li>
          <li
            style={{
              display: "inline-block",

              marginLeft: "10px",
            }}
          >
            <ItemShow
              imgSrc={ActionMovies[1].posterurl}
              rating={ActionMovies[1].imdbRating}
              genres={ActionMovies[1].genres}
              title={
                ActionMovies[1].originalTitle
                  ? ActionMovies[1].originalTitle
                  : ActionMovies[1].title
              }
              year={ActionMovies[1].year}
              movie={ActionMovies[1]}
            />
          </li>
          <li
            style={{
              display: "inline-block",

              marginLeft: "10px",
            }}
          >
            <ItemShow
              imgSrc={ActionMovies[2].posterurl}
              rating={ActionMovies[2].imdbRating}
              genres={ActionMovies[2].genres}
              title={
                ActionMovies[2].originalTitle
                  ? ActionMovies[2].originalTitle
                  : ActionMovies[2].title
              }
              year={ActionMovies[2].year}
              movie={ActionMovies[2]}
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
              imgSrc={ActionMovies[3].posterurl}
              rating={ActionMovies[3].imdbRating}
              genres={ActionMovies[3].genres}
              title={
                ActionMovies[3].originalTitle
                  ? ActionMovies[3].originalTitle
                  : ActionMovies[3].title
              }
              year={ActionMovies[3].year}
              movie={ActionMovies[3]}
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
