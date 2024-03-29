import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import InputField from "./InputField";
import { logout } from "../store/actions/auth";
import { quickSearch } from "../store/actions/movies";
import QuickSearchList from "./QuickSearchList";
const Navbar = ({ isAuthenticated, logout, onQuickSearch }) => {
  const history = useHistory();
  // const initialState = {
  //   quickQearch: "",
  // };
  const [listDisplay, setListDisplay] = useState(false);
  const onChange = (e) => {
    if (e.target.value) {
      onQuickSearch(e.target.value);
    } else {
      onQuickSearch("");
    }
  };
  return (
    <div className="navbar">
      <span className="header">search your favorite movies</span>

      {/* <div style={{ display: "flex", float: "right", marginRight: "10px" }}> */}
      <InputField
        onChange={onChange}
        onfocusout={() => setListDisplay(false)}
        onfocusin={() => {
          setListDisplay(true);
        }}
      />
      {listDisplay ? <QuickSearchList /> : null}

      <div className="links">
        <Link style={{ paddingLeft: "10px" }} to="/" className="btn ">
          <i className="fas fa-user-circle text-primary" />
          Home
        </Link>
        {isAuthenticated ? (
          <Link
            style={{ paddingLeft: "10px" }}
            to="/browse-movies"
            className="btn "
          >
            <i className="fas fa-user-circle text-primary" />
            Browse-movies
          </Link>
        ) : null}
        {!isAuthenticated ? (
          <Link style={{ paddingLeft: "10px" }} to="/login">
            <i className="fab fa-black-tie text-primary" />
            Login
          </Link>
        ) : (
          <Link style={{ paddingLeft: "10px" }} to="/profile">
            <i className="fab fa-black-tie text-primary" />
            Profile
          </Link>
        )}
        {!isAuthenticated ? (
          <Link style={{ paddingLeft: "10px" }} to="/register">
            <i className="fas fa-graduation-cap text-primary" />
            Register
          </Link>
        ) : (
          <button
            style={{ paddingLeft: "10px" }}
            className="btn"
            onClick={() => {
              logout();
              history.replace("/");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    onQuickSearch: (substring) => dispatch(quickSearch(substring)),
    logout: () => dispatch(logout()),
  };
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
