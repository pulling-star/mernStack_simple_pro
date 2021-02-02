import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/movies";
import { useHistory } from "react-router-dom";

const SearchArea = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState("All");
  const [genre, setGenre] = useState("All");
  const [releaseYear, setReleaseYear] = useState("All");
  const [orderedBy, setOrderedBy] = useState("Latest");
  let history = useHistory();

  const searchForMovies = props.isAuthenticated
    ? () => {
        props.onSearch(
          {
            searchTerm,
            orderedBy,
            releaseYear,
            rating,
            genre,
          },
          1
        );
        history.push("/browse-movies");
      }
    : () => history.push("/login");
  return (
    <div
      style={{
        background: "#171717",
        padding: "50px",
      }}
    >
      <div className="container">
        <div
          style={{
            width: "125%",
            display: "inline-block",
            marginRight: "10px",
          }}
        >
          <p style={{ float: "left !important" }}>Search Term:</p>
          <input
            type="search"
            style={{ width: "80%" }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div style={{ display: "inline-block" }}>
            <button className="searchButton" onClick={searchForMovies}>
              Search
            </button>
          </div>
        </div>
        <div
          style={{ width: "23.5%", display: "inline-block", marginRight: "2%" }}
        >
          <p style={{ float: "left !important" }}>Rating:</p>
          <select type="search" onChange={(e) => setRating(e.target.value)}>
            <option value="0">All</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
            <option value="5">5+</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
            <option value="1">1+</option>
          </select>
        </div>
        <div
          style={{ width: "23.5%", display: "inline-block", marginRight: "2%" }}
        >
          <p style={{ float: "left !important" }}>Genre:</p>
          <select type="search" onChange={(e) => setGenre(e.target.value)}>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Biography">Biography</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Drama">Drama</option>
            <option value="Family">Family</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Film-noir">Film-Noir</option>
            <option value="Game-show">Game-Show</option>
            <option value="History">History</option>
            <option value="Horror">Horror</option>
            <option value="Music">Music</option>
            <option value="Musical">Musical</option>
            <option value="Mystery">Mystery</option>
            <option value="News">News</option>
            <option value="Reality-tv">Reality-TV</option>
            <option value="Romance">Romance</option>
            <option value="Dci-fi">Sci-Fi</option>
            <option value="Sport">Sport</option>
            <option value="Talk-show">Talk-Show</option>
            <option value="Thriller">Thriller</option>
            <option value="War">War</option>
            <option value="Western">Western</option>
          </select>
        </div>
        <div
          style={{ width: "23.5%", display: "inline-block", marginRight: "2%" }}
        >
          <p style={{ float: "left !important" }}>Year:</p>
          <select
            type="search"
            onChange={(e) => setReleaseYear(e.target.value)}
          >
            <option value="All">All</option>

            <option value="2019-2021">2019-2021</option>
            <option value="2015-2018">2015-2018</option>
            <option value="2010-2014">2010-2014</option>
            <option value="2000-2009">2000-2009</option>
            <option value="1990-1999">1990-1999</option>
            <option value="1980-1989">1980-1989</option>
            <option value="1970-1979">1970-1979</option>
            <option value="1950-1969">1950-1969</option>
            <option value="1900-1949">1900-1949</option>
          </select>
        </div>
        <div style={{ width: "23.5%", display: "inline-block" }}>
          <p style={{ float: "left !important" }}>Order By:</p>
          <select
            type="search"
            name="order_by"
            onChange={(e) => setOrderedBy(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (searchReqs, page_no) => {
      dispatch(actions.getMovies(searchReqs, page_no));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.movies.searchTerm,
    orderedBy: state.movies.orderedBy,
    releaseYear: state.movies.releaseYear,
    rating: state.movies.rating,
    genre: state.movies.genre,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);
