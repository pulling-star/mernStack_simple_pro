import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../store/actions/auth";
import PropTypes from "prop-types";
const Login = ({ login, isAuthenticated }) => {
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
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <div className="register">
        <h1 className="large text-primary">Sign In</h1>

        <form className="form" onSubmit={(e) => onSubmit(e)}>
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
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
