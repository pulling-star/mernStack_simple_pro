import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const NotFound = ({ isAuthenticated }) => {
  return (
    <div>
      <h1
        style={{ color: "#6ac045", textAlign: "center", paddingTop: "100px" }}
      >
        Error! Not found (this page does not exist).
      </h1>
      {isAuthenticated ? (
        <h3 style={{ color: "#919191", textAlign: "center" }}>
          {" "}
          Please <Link to="/login">(LOGIN)</Link> to search for your recommend
          movies or <Link to="/register"> Create a Free Account </Link> (it
          takes few seconds)
        </h3>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(NotFound);
