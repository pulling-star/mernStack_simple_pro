import React from "react";
import RatingMovies from "./RatingMovies";
import LatestMovies from "./LatestMovies";
import ActionMovies from "./ActionMovies";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Home = () => {
  return (
    <div className="home">
      <h1>Find Your favorite movie</h1>
      <p>you can find your favorite movie based on rating, genre, or year </p>
      <div style={{ marginTop: "30px" }}>
        <h2>
          Some heighest rating movies{" "}
          <FontAwesomeIcon style={{ color: "#6ac045" }} icon={faStar} />
        </h2>
        <RatingMovies choise="rating" />
      </div>
      <div style={{ marginTop: "70px" }}>
        <h2>latest movies </h2>
        <LatestMovies choise="year" />
      </div>

      <div style={{ marginTop: "70px" }}>
        <h2>Some Action movies </h2>
        <ActionMovies choise="action" />
      </div>
    </div>
  );
};

export default Home;
