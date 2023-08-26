import React from "react";
import QuickSearchItem from "./QuickSearchItem";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
function QuickSearchList({ moviesQuickSearch, onGetAMovie }) {
  const history = useHistory();
  let list = moviesQuickSearch
    ? moviesQuickSearch.map((m) => (
        <li
          key={m._id}
          onMouseDown={() => {
            history.push({
              pathname: "/movies",

              state: { m: m },
            });
          }}
        >
          <QuickSearchItem
            name={m.Title}
            img={m.Poster}
            year={m.Year}
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
