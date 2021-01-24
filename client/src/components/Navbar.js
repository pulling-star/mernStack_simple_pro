import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import InputField from "./InputField";
import { logout } from "../store/actions/auth";
const Navbar = ({ isAuthenticated, logout }) => {
  const initialState = {
    quickQearch: "",
  };
  const [formData, setFormData] = useState(initialState);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="navbar">
      <span className="header">search for your favorite movies</span>

      <div style={{ float: "right", display: "flex", marginRight: "5% " }}>
        <div>
          <InputField onChange={onChange} />
        </div>
        <div>
          <Link to="/" className="btn ">
            <i className="fas fa-user-circle text-primary" />
            Home
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className="btn ">
              <i className="fab fa-black-tie text-primary" />
              Login
            </Link>
          ) : null}
          {!isAuthenticated ? (
            <Link to="/register" className="btn">
              <i className="fas fa-graduation-cap text-primary" />
              Register
            </Link>
          ) : (
            <button className="btn" onClick={logout}>
              logOut
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps, { logout })(Navbar);
