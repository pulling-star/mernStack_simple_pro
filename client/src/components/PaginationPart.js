import React from "react";

function PaginationPart() {
  return (
    <div>
      <ul className="pagination">
        <li>
          <a className="current">1</a>
        </li>
        <li>
          <a>2</a>
        </li>
        <li>
          <a>3</a>
        </li>
        <li>
          <a>4</a>
        </li>
        <li>
          <a>5</a>
        </li>
        <li>
          <a>6</a>
        </li>
        <li>
          <a>7</a>
        </li>
        <li>
          <a>8</a>
        </li>
        <li>
          <a>9</a>
        </li>
        <li>
          <a>10</a>
        </li>
        <li>
          <a href="/browse-movies?page=2">Next »</a>
        </li>
        <li>
          <a href="/browse-movies?page=1270">Last »</a>
        </li>
      </ul>
    </div>
  );
}

export default PaginationPart;
