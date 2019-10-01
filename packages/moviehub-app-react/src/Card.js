import React from "react";

function Card(props) {
  return (
    <div key={props.movieId} className="col-sm-6 mb-3">
      <div className="row">
        <div className="col-7">
          <img src={props.poster} alt={props.title} className="img-fluid" />
        </div>
        <div className="col-5">
          <h3 className="movie-title">{props.title}</h3>
          <p>
            Genre: {props.type}.<br /> Year: {props.year}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
