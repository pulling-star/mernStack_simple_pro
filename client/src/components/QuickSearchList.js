import React, { useState } from "react";
import QuickSearchItem from "./QuickSearchItem";
import { connect } from "react-redux";
function QuickSearchList({ moviesQuickSearch }) {
  let list = moviesQuickSearch
    ? moviesQuickSearch.map((m) => (
        <li key={m._id}>
          <QuickSearchItem
            name={m.originalTitle}
            img={m.posterurl}
            year={m.year}
          />
        </li>
      ))
    : null;

  return (
    <div className="quicksearch">
      <ul style={{ display: "block" }}>{list}</ul>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    moviesQuickSearch: state.movies.moviesQuickSearch,
  };
};
export default connect(mapStateToProps)(QuickSearchList);
