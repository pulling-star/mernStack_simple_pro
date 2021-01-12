import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import InputField from "./InputField";
const Navbar = () => {
  const initialState = {
    quickQearch: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { quickQearch } = formData;

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
          <Link to="/" className="btn ">
            <i className="fab fa-black-tie text-primary" />
            Login
          </Link>
          <Link to="/" className="btn ">
            <i className="fas fa-graduation-cap text-primary" />
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
