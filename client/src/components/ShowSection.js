import React, { useEffect } from "react";
import { connect } from "react-redux";

import ItemShow from "./ItemShow";
import SearchArea from "./SearchArea";

import PaginationPart from "./PaginationPart";
const ShowSection = ({ movies, Mlength, orderedBy, msg, history }) => {
  return (
    <div style={{ background: "#1d1d1d", textAlign: "center" }}>
      <SearchArea />
      {Mlength > 0 ? (
        <h2
          style={{
            color: "#6ac045",
            textAlign: "center",
            fontWeight: "normal",
          }}
        >
          {Mlength} recommended movies found(by:{orderedBy})
        </h2>
      ) : (
        <h2
          style={{
            color: "#6ac045",
            textAlign: "center",
            fontWeight: "normal",
          }}
        >
          {msg}
        </h2>
      )}
      {Mlength > 20 ? <PaginationPart /> : null}
      <div className="showSection">
        {movies
          ? movies.map((mov, index) => (
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
      {Mlength > 20 ? <PaginationPart /> : null}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    movies: state.movies.Movies,
    Mlength: state.movies.Mlength,
    orderedBy: state.movies.orderedBy,
    msg: state.movies.msg,
  };
};
export default connect(mapStateToProps)(ShowSection);
