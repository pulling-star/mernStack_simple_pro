import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../store/actions/auth";
import PropTypes from "prop-types";
const Login = ({ login, isAuthenticated, location, err }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login({ email, password });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    if (location.state) {
      return (
        <Redirect
          to={{
            pathname: location.state.prevpath,
            state: { m: location.state.m },
          }}
        />
      );
    } else {
      return <Redirect to="/" />;
    }
  }
  return (
    <div>
      <div className="register">
        <h1 className="large text-primary">Sign In</h1>

        <form className="form" onSubmit={(e) => onSubmit(e)}>
          {err ? <div className="alert alert-danger">{err}</div> : null}
          <div className="Input">
            <input
              type="email"
              className="InputElement"
              placeholder="Email Address"
              name="email"
              onChange={(e) => onChange(e)}
              value={email}
              required
            />
          </div>
          <div className="Input">
            <input
              type="password"
              className="InputElement"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
              autoComplete="off"
            />
          </div>
          <input type="submit" className="button-reg" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account?{" "}
          <Link className="btn" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  err: state.auth.err,
});
export default connect(mapStateToProps, { login })(Login);
