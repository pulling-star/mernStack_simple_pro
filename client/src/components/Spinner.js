import React, { Fragment } from "react";
import spinner from "./Spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: "200px",
        margin: "auto",
        display: "block",
        backgroundColor: "#1d1d1d",
        paddingTop: "50px",
      }}
      alt="Loading..."
    />
  </Fragment>
);
