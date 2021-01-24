import React from "react";
import { connect } from "react-redux";

import ItemShow from "./ItemShow";
import SearchArea from "./SearchArea";
import { withRouter } from "react-router";

import PaginationPart from "./PaginationPart";
const ShowSection = ({ movies, Mlength, orderedBy, msg }) => {
  return (
    <div style={{ background: "#1d1d1d" }}>
      <SearchArea />
      {Mlength > 0 ? (
        <h2
          style={{
            color: "#6ac045",
            textAlign: "center",
            fontWeight: "normal",
          }}
        >
          {Mlength} recommended movies foumd(by:{orderedBy})
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
        {movies.length > 0
          ? movies.map((mov, index) => (
              <ItemShow
                key={mov._id}
                imgSrc={mov.posterurl}
                rating={mov.imdbRating}
                genres={mov.genres}
                title={mov.originalTitle ? mov.originalTitle : mov.title}
                year={mov.year}
                position={index}
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
    // orders: state.order.orders,
    movies: state.movies.Movies,
    Mlength: state.movies.Mlength,
    orderedBy: state.movies.orderedBy,
    msg: state.movies.msg,
  };
};
export default withRouter(connect(mapStateToProps)(ShowSection));
