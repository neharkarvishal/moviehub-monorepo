import React from "react";

function Button(props) {
  return (
    <button
      className="btn btn-primary btn-large btn-block"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
