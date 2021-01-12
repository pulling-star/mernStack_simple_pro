import React from "react";

const SearchArea = () => {
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
            width: "100%",
            display: "inline-block",
            marginRight: "10px",
          }}
        >
          <p style={{ float: "left !important" }}>Search Term:</p>
          <input type="search" style={{ width: "100%" }} />
        </div>
        <div
          style={{ width: "23.5%", display: "inline-block", marginRight: "2%" }}
        >
          <p style={{ float: "left !important" }}>Rating:</p>
          <select type="search">
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
          <select type="search">
            <option value="all">All</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="animation">Animation</option>
            <option value="biography">Biography</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="documentary">Documentary</option>
            <option value="drama">Drama</option>
            <option value="family">Family</option>
            <option value="fantasy">Fantasy</option>
            <option value="film-noir">Film-Noir</option>
            <option value="game-show">Game-Show</option>
            <option value="history">History</option>
            <option value="horror">Horror</option>
            <option value="music">Music</option>
            <option value="musical">Musical</option>
            <option value="mystery">Mystery</option>
            <option value="news">News</option>
            <option value="reality-tv">Reality-TV</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="sport">Sport</option>
            <option value="talk-show">Talk-Show</option>
            <option value="thriller">Thriller</option>
            <option value="war">War</option>
            <option value="western">Western</option>
          </select>
        </div>
        <div
          style={{ width: "23.5%", display: "inline-block", marginRight: "2%" }}
        >
          <p style={{ float: "left !important" }}>Year:</p>
          <select type="search">
            <option value="0">All</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
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
          <select type="search" name="order_by">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="featured">Featured</option>
            <option value="seeds">Seeds</option>
            <option value="peers">Peers</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
            <option value="likes">Likes</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="downloads">Downloads</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default SearchArea;
