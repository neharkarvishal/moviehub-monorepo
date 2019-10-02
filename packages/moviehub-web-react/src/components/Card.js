import React from "react";

function Card(props) {
  const { key, poster, title, type, year } = props;
  return (
    <div key={key} className="col-sm-6 mb-3">
      <div className="row">
        <div className="col-7">
          <img src={poster} alt={title} className="img-fluid" />
        </div>
        <div className="col-5">
          <h3 className="movie-title">{title}</h3>
          <p>
            Genre: {type}.<br /> Year: {year}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
