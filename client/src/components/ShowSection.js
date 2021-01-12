import React from "react";
import ItemShow from "./ItemShow";
import { BrowserRouter as Router } from "react-router-dom";
import { withRouter } from "react-router";
import SearchArea from "./SearchArea";
const ShowSection = () => {
  return (
    <div style={{ background: "#1d1d1d" }}>
      <SearchArea />
      <div className="showSection">
        <ItemShow />
        <ItemShow />
        <ItemShow />
        <ItemShow />
        <ItemShow />
        <ItemShow />
      </div>
    </div>
  );
};

export default withRouter(ShowSection);
