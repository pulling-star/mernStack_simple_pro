import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ItemShow = () => {
  //   const [state, setstate] = useState(initialState);
  {
    return (
      <Link to="/movies">
        <figure>
          <img
            className="FilmImage"
            src="https://img.yts.mx/assets/images/movies/wubbzys_big_movie_2008/medium-cover.jpg"
            alt="Wubbzy's Big Movie! (2008) download"
          />
          <figcaption>
            <FontAwesomeIcon className="icon-star" icon={faStar} />
            <h4>6.6 / 10</h4>
            <h4>Adventure</h4>
            <h4>Animation</h4>
            <span className="button-green">View Details</span>
          </figcaption>
        </figure>
      </Link>
    );
  }
};
export default ItemShow;
