import React from 'react';

function Header(props) {
  return (
    <div className="col-sm-8 offset-sm-2">
      <header>
        <h1>
          <img
            src={props.logo}
            alt="Moviehub"
            className="logo"
          />
          {props.text}
        </h1>
      </header>
    </div>
  );
}

export default Header;
