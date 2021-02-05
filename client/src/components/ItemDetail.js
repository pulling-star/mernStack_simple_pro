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
  console.log(m);

  let movie;
  if (m) {
    movie = m;
  }
  const [favorite, setFavorite] = useState(
    user.favorites.some((item) => item.movieId === movie._id)
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
      <div className="ItemDetailView">
        <div>
          <img alt="" width="260" height="390" src={movie.posterurl} />

          {favoriteElement}
        </div>

        <div style={{ color: "white", paddingLeft: "120px" }}>
          <div style={{ marginBottom: "50px" }}>
            <h1>{movie.originalTitle || movie.title}</h1>
            <h2>{movie.year}</h2>
            <h2>{movie.genres[0]}</h2>
          </div>
          <div>
            <h2>
              Likes: {movie.likes.length}
              <FontAwesomeIcon
                onClick={() => onFavorites(movie)}
                icon={faHeart}
                className="icon-heart"
              />
            </h2>
          </div>
          <div style={{ display: "flex" }}>
            <h2 style={{ marginRight: "20px" }}>Imdb</h2>
            <h2>{movie.imdbRating}</h2>
            <FontAwesomeIcon icon={faStar} className="icon-star" />
          </div>
        </div>
        <div>
          <p style={{ color: "white", padding: "10px" }}>similar movies</p>
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
      <div style={{ padding: "20px 200px", display: "flex" }}>
        <div style={{ color: "white", width: "60%" }}>
          <h2>story line</h2>
          <p style={{ color: "#919191" }}>{movie.storyline}</p>
        </div>
        <div style={{ marginLeft: "100px" }}>
          <h2 style={{ color: "white" }}>cast</h2>
          <div>
            {movie.actors.map((a, index) => (
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
