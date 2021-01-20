import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/actions";
function PaginationPart({
  Mlength,
  current,
  onHitPage,
  searchTerm,
  rating,
  releaseYear,
  orderedBy,
  genre,
}) {
  let pages = Mlength / 20;
  let pagesList = [];
  if (pages % 1 !== 0) {
    pages = parseInt(pages) + 1;
  }
  for (let index = 0; index < pages; index++) {
    pagesList.push(
      parseInt(current) === index + 1 ? (
        <li
          onClick={() =>
            onHitPage(
              { searchTerm, rating, releaseYear, orderedBy, genre },
              index + 1
            )
          }
          key={index}
        >
          <Link to={"/browse-movies?page=" + current} className="current">
            {index + 1}
          </Link>
        </li>
      ) : (
        <li
          onClick={() =>
            onHitPage(
              { searchTerm, rating, releaseYear, orderedBy, genre },
              index + 1
            )
          }
          key={index}
        >
          <Link to={"/browse-movies?page=" + (index + 1)}>{index + 1}</Link>
        </li>
      )
    );
  }
  return (
    <div>
      <ul className="pagination">
        {pagesList.map((l) => l)}
        {Mlength > 20 ? (
          <li
            onClick={() =>
              onHitPage(
                { searchTerm, rating, releaseYear, orderedBy, genre },
                current + 1
              )
            }
          >
            <Link to={"/browse-movies?page=" + (current + 1)}>Next »</Link>
          </li>
        ) : null}
        {Mlength > 20 ? (
          <li
            onClick={() =>
              onHitPage(
                { searchTerm, rating, releaseYear, orderedBy, genre },
                Mlength
              )
            }
          >
            <Link to={"/browse-movies?page=" + Mlength}>Last »</Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    onHitPage: (searchReqs, page_no) => {
      dispatch(actions.getMovies(searchReqs, page_no));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    // orders: state.order.orders,
    current: state.page_no,
    Mlength: state.Mlength,
    searchTerm: state.searchTerm,
    rating: state.rating,
    genre: state.genre,
    releaseYear: state.releaseYear,
    orderedBy: state.orderedBy,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaginationPart);
