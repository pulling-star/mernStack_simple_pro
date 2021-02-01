import React from "react";

function QuickSearchItem({ name, img, year }) {
  return (
    <div className="quicksearchitem">
      <img style={{ float: "left" }} width="43px" src={img} />
      <h2>{name}</h2>
      <p>{year}</p>
    </div>
  );
}

export default QuickSearchItem;
