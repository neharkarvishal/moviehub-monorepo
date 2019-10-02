import React from "react";

function Button(props) {
  const { text, onClick } = props;
  return (
    <button
      className="btn btn-primary btn-large btn-block"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
