import React, { useState } from "react";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { addToFavorite } from "../store/actions/auth";
import Spinner from "./Spinner";

import { Redirect } from "react-router-dom";
function ItemDetail({
  loading,
  user,
  movies,
  onFavorites,
  location: {
    state: { m },
  },
}) {
  let movie;
  if (m) {
    movie = m;
  }
  const [favorite, setFavorite] = useState(
    user ? user.favorites.some((item) => item.movieId === movie._id) : null
  );

  if (!movie) {
    return <Redirect to="/" />;
  }

  const favoriteElement = loading ? (
    <Spinner />
  ) : favorite ? (
    <p className="favorite">
      remove from favorites
      <FontAwesomeIcon
        icon={faStar}
        onClick={() => {
          setFavorite(!favorite);
          onFavorites(movie);
        }}
        className="icon-star"
      />
    </p>
  ) : (
    <p className="favorite">
      add to favorites
      <FontAwesomeIcon
        icon={faStar}
        onClick={() => {
          setFavorite(!favorite);
          onFavorites(movie);
        }}
        className="white-star"
      />
    </p>
  );
  return (
    <div
      style={{
        background: "#1d1d1d",
        top: "50px",
        position: "relative",
      }}
    >
      <div className="breadcrumb" >{"Home / Movies /  "}<span className="active">{" "}{movie.Title}</span></div>
      <div className="ItemDetailView">
        <div>
          <img alt="" width="220" height="320" src={movie.Poster} />
          {favoriteElement}
        </div>
        <div style={{ color: "white",textAlign:"left",marginLeft:"10px"}}>
          <div >
            <h3>{movie.Title}</h3>
            <div>
        <div style={{ color: "white",fontSize:"12px"}}>
          <p style={{ color: "#919191" }}>{movie.Plot}</p>
        </div>
        {/* <div style={{ marginLeft: "100px" }}>
          <h2 style={{ color: "white" }}>cast</h2>
          <div>
            {movie.Actors.split(',').map((a, index) => (
              <p
                key={index}
                style={{
                  color: "#919191",
                  overflow: "hidden",
                  borderBottom: "1px solid #2f2f2f",
                  padding: " 10px 0",
                }}
              >
                {a}
              </p>
            ))}
          </div>
        </div> */}
      </div>
      <div className="info">
      <div >
      <p>Genre: <span>{movie.Genre}</span></p>
      <p>Director: <span>{movie.Director}</span></p>
      <p>Actors: <span>{movie.Actors}</span></p>
      <p>Country: <span>{movie.Country}</span></p>
      </div>
         <div >
      <p>Duration: <span>{movie.Runtime}</span></p>
      <p>Release: <span>{movie.Year}</span></p>
      <p>Language: <span>{movie.Language}</span></p>
      <p>Awards: <span>{movie.Awards}</span></p>
      </div>
      </div>
        
          
       
            {/* <h3 style={{ marginRight: "20px" }}>
              Imdb:{movie.imdbRating}
            <FontAwesomeIcon icon={faStar} className="icon-star" />
            </h3> */}
          
          </div>
          {/* <div>
            <h2>
              Likes: {movie.likes.length}
              <FontAwesomeIcon
                onClick={() => onFavorites(movie)}
                icon={faHeart}
                className="icon-heart"
              />
            </h2>
          </div> */}
          
        </div>
       
      </div>
      <br />
      <div className="container_similar">
      <div class="similar_tag">
<span>You May Also Like</span></div>
          <div className="similarMovies">
            <a
              href="https://yts.mx/movies/the-darkness-2016"
              title="The Darkness (2016)"
            >
              <img
                src="https://img.yts.mx/assets/images/movies/the_darkness_2016/medium-cover.jpg"
                alt="The Darkness (2016) download"
                // width="90"
                // height="130"
              />
            </a>
            <a
              href="https://yts.mx/movies/and-soon-the-darkness-1970"
              title="And Soon the Darkness (1970)"
            >
              <img
                src="https://img.yts.mx/assets/images/movies/and_soon_the_darkness_1970/medium-cover.jpg"
                alt="And Soon the Darkness (1970) download"
                width="90"
                height="130"
              />
            </a>
            <a
              href="https://yts.mx/movies/beyond-the-darkness-1979"
              title="Beyond the Darkness (1979)"
            >
              <img
                src="https://img.yts.mx/assets/images/movies/beyond_the_darkness_1979/medium-cover.jpg"
                alt="Beyond the Darkness (1979) download"
                width="90"
                height="130"
              />
            </a>
            <a
              href="https://yts.mx/movies/serena-waits-2018"
              title="Serena Waits (2018)"
            >
              <img
                src="https://img.yts.mx/assets/images/movies/serena_waits_2018/medium-cover.jpg"
                alt="Serena Waits (2018) download"
                width="90"
                height="130"
              />
            </a>
          </div>
        </div>
      
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    onFavorites: (mov) => {
      dispatch(addToFavorite(mov));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    movies: state.movies.Movies,
    Mlength: state.movies.Mlength,
    orderedBy: state.movies.orderedBy,
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ItemDetail)
);
