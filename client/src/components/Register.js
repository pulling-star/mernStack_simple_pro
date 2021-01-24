import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../store/actions/alert";
import { register } from "../store/actions/auth";
import PropTypes from "prop-types";
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };
  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <div className="register">
        <h1 className="large text-primary">Sign Up</h1>

        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="Input">
            <input
              className="InputElement"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="Input">
            <input
              className="InputElement"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </div>
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>

          <div className="Input">
            <input
              className="InputElement"
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="Input">
            <input
              className="InputElement"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="button-reg" value="Register" />
        </form>
        <p className="my-1">
          Already have an account?{" "}
          <Link className="btn" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
