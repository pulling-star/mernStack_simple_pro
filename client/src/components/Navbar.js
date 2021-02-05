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
      <span className="header">search for your favorite movies</span>

      <div style={{ float: "right", display: "flex", paddingRight: "15% " }}>
        <div>
          <InputField
            onChange={onChange}
            onfocusout={() => setListDisplay(false)}
            onfocusin={() => {
              setListDisplay(true);
            }}
          />
          {listDisplay ? <QuickSearchList /> : null}
        </div>
        <div>
          <Link style={{ paddingLeft: "10px" }} to="/" className="btn ">
            <i className="fas fa-user-circle text-primary" />
            Home
          </Link>
          {!isAuthenticated ? (
            <Link style={{ paddingLeft: "10px" }} to="/login" className="btn ">
              <i className="fab fa-black-tie text-primary" />
              Login
            </Link>
          ) : (
            <Link
              style={{ paddingLeft: "10px" }}
              to="/profile"
              className="btn "
            >
              <i className="fab fa-black-tie text-primary" />
              Profile
            </Link>
          )}
          {!isAuthenticated ? (
            <Link
              style={{ paddingLeft: "10px" }}
              to="/register"
              className="btn"
            >
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
