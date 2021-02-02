import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1
        style={{ color: "#6ac045", textAlign: "center", paddingTop: "100px" }}
      >
        Error! Not found (this page does not exist).
      </h1>
      <h3 style={{ color: "#919191", textAlign: "center" }}>
        {" "}
        Please LOGIN to search for your recommend movies or Create a Free
        Account (it takes few seconds).
      </h3>
    </div>
  );
};

export default NotFound;
