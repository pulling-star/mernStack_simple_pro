import React from "react";
import { connect } from "react-redux";

import ItemShow from "./ItemShow";

import { withRouter } from "react-router";

import PaginationPart from "./PaginationPart";
const ShowSection = ({ movies, Mlength }) => {
  return (
    <div style={{ background: "#1d1d1d" }}>
      {/* <SearchArea /> */}
      {movies.length > 0 ? <PaginationPart /> : null}
      <div className="showSection">
        {movies.map((mov) => (
          <ItemShow
            key={mov._id}
            imgSrc={mov.posterurl}
            rating={mov.imdbRating}
            genres={mov.genres}
            title={mov.originalTitle ? mov.originalTitle : mov.title}
            year={mov.year}
          />
        ))}
      </div>
      {movies.length > 0 ? <PaginationPart /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // orders: state.order.orders,
    movies: state.Movies,
    Mlength: state.Mlength,
  };
};
export default withRouter(connect(mapStateToProps)(ShowSection));
