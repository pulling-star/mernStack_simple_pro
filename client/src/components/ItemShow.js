import React from "react";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ItemShow = ({ imgSrc, rating, genres, title, year, movie }) => {
  return (
    <div>
      <Link
        to={{
          pathname: "/movies",
          state: {
            m: movie,
          },
        }}
      >
        <figure>
          <img
            className="FilmImage"
            width="280"
            height="430"
            src={imgSrc}
            alt="a"
          />
          <figcaption>
            <FontAwesomeIcon className="icon-star" icon={faStar} />
            <h4>{rating} / 10</h4>
            <h4>{genres[0]}</h4>
            <h4>{genres[1]}</h4>
            <span className="button-green">View Details</span>
          </figcaption>
        </figure>
      </Link>
      <div>
        <h2 className="movieTitle">{title}</h2>
        <h2 className="movieYear">{year}</h2>
      </div>
    </div>
  );
};
export default ItemShow;
