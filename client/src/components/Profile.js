import React, { useEffect } from "react";
import { connect } from "react-redux";
import FavoriteItem from "./FavoriteItem";
import { getFavorites } from "../store/actions/movies";
import Spinner from "./Spinner";
function Profile({
  user: { _id, name, avatar, email },
  favorites,
  onGetFavorites,
  movies,
}) {
  useEffect(() => {
    onGetFavorites(favorites);
  }, [onGetFavorites, favorites]);
  return (
    <div className="Profile">
      <div className="profileItems">
        <div style={{  paddingTop: "30px" }}>
          {/* <img src={avatar} alt="" className="round-img" /> */}
          <h2>{name}</h2>
          <h3>{email}</h3>
        </div>

        <div>
          <h2 style={{ fontFamily: "cursive" }}>Favorites</h2>
          {movies ? (
            movies.map((f) => <FavoriteItem key={f._id} movie={f} />)
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFavorites: (id) => {
      dispatch(getFavorites(id));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    favorites: state.auth.favorites,
    movies: state.movies.SpecificMovies,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
