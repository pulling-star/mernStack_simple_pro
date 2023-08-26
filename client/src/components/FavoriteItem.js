import { faStar, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addToFavorite } from "../store/actions/auth";

function FavoriteItem({ user, id, movie, loading }) {
  console.log(movie);

  // useEffect(() => {
  //   onGetMovie(id);
  // }, []);

  return (
    <div
      style={{
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        borderTop: "1px solid #919191",


      }}
    >
      <div
        style={{
          display: "inline-block",
          marginRight: "20px",
        }}
      >
        <img
          src={movie.Poster}
          alt=""
          width="150px"
          height="150px"
          style={{
            borderRadius: "50%",
            border: "1px solid #00a7c9",
            cursor: "pointer",
          }}
        />
      </div>
      <div className="favInfo">
        <h3 >Title: {movie.Title}</h3>
        <h3 >
          imdbRating: {movie.imdbRating}
        </h3>
        
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    loading: state.movies.loading,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(FavoriteItem);
