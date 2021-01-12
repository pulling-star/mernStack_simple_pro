import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ItemDetail() {
  return (
    <div
      style={{
        background: "#1d1d1d",
        top: "50px",
        position: "relative",
      }}
    >
      <div className="ItemDetailView">
        <div>
          <img
            itemprop="image"
            src="https://img.yts.mx/assets/images/movies/darkness_waits_2020/medium-cover.jpg"
            alt="Darkness Waits (2020) download"
          />
        </div>

        <div style={{ color: "white", paddingLeft: "120px" }}>
          <div style={{ marginBottom: "50px" }}>
            <h1>Darkness Waits</h1>
            <h2>2020</h2>
            <h2>Horror</h2>
          </div>
          <div style={{ display: "flex" }}>
            <h2 style={{ marginRight: "20px" }}>Imdb</h2>
            <h2>3</h2>
            <FontAwesomeIcon icon={faStar} className="icon-star" />
          </div>
        </div>
        <div>
          <p style={{ color: "white", padding: "10px" }}>similar movies</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: " 1fr 1fr ",
              gridTemplateRows: "1fr 1fr",
            }}
          >
            <a
              href="https://yts.mx/movies/the-darkness-2016"
              title="The Darkness (2016)"
            >
              <img
                src="https://img.yts.mx/assets/images/movies/the_darkness_2016/medium-cover.jpg"
                alt="The Darkness (2016) download"
              />
            </a>
            <a
              href="https://yts.mx/movies/and-soon-the-darkness-1970"
              title="And Soon the Darkness (1970)"
            >
              <img
                src="https://img.yts.mx/assets/images/movies/and_soon_the_darkness_1970/medium-cover.jpg"
                alt="And Soon the Darkness (1970) download"
              />
            </a>
            <a
              href="https://yts.mx/movies/beyond-the-darkness-1979"
              title="Beyond the Darkness (1979)"
            >
              <img
                src="https://img.yts.mx/assets/images/movies/beyond_the_darkness_1979/medium-cover.jpg"
                alt="Beyond the Darkness (1979) download"
              />
            </a>
            <a
              href="https://yts.mx/movies/serena-waits-2018"
              title="Serena Waits (2018)"
            >
              <img
                src="https://img.yts.mx/assets/images/movies/serena_waits_2018/medium-cover.jpg"
                alt="Serena Waits (2018) download"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
