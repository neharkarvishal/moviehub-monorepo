import React from "react";

function Header(props) {
  return (
    <header>
      <h1>
        <img src={props.logo} alt="Moviehub" className="logo" />
        {props.text}
      </h1>
    </header>
  );
}

export default Header;
