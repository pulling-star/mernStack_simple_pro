import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function FavoriteItem({ id, movie, loading }) {
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
        borderBottom: "1px solid #00a7c9",
      }}
    >
      <div
        style={{
          display: "inline-block",
          marginRight: "20px",
        }}
      >
        <img
          src={movie.posterurl}
          width="150px"
          height="150px"
          style={{
            borderRadius: "50%",
            border: "1px solid #00a7c9",
            cursor: "pointer",
          }}
        />
      </div>
      <div style={{ display: "inline-block", paddingTop: "50px" }}>
        <p>{movie.title}</p>
        <p>{movie.imdbRating}</p>
      </div>
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onGetMovie: (id) => {
//       dispatch(getMovie(id));
//     },
//   };
// };
const mapStateToProps = (state) => {
  return {
    loading: state.movies.loading,
  };
};
export default connect(mapStateToProps)(FavoriteItem);
